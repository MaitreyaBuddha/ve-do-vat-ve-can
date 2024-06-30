import { Router, Request, Response } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ComputeUnit } from '@/models/computeUnit.model';

export default class ComputeUnitRoute implements Routes {
  public path = '/compute-unit';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/webhook`, this.webhook);
    this.router.get(`${this.path}/:nodeId`, this.getComputeUnitsByNode);
  }

  private webhook = async (req: Request, res: Response) => {
    const { workerNodeId, workload } = req.body;

    // Validate the data
    if (!workerNodeId || !workload) {
      return res.status(400).json({ error: 'Missing workerNodeId or workload' });
    }

    // Create a new ComputeUnit
    const computeUnit = await ComputeUnit.create({
      workerNodeId,
      timestamp: new Date(),
      workload,
    });

    res.status(201).json(computeUnit);
  };

  private getComputeUnitsByNode = async (req: Request, res: Response) => {
    const { nodeId } = req.params;

    // Fetch all ComputeUnits for the given node
    const computeUnits = await ComputeUnit.findAll({
      where: {
        workerNodeId: nodeId,
      },
    });

    res.status(200).json(computeUnits);
  };
}
