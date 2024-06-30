import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { OpenaiService } from '@/services/openai.service';
import { Admission } from '@/interfaces/submission.interface';
import { HttpException } from '@/exceptions/HttpException';
import { ContractsService } from '@/services/contracts.service';
import { CaptchaService } from '@/services/captcha.service';

export class SubmissionController {
  public contracts = Container.get(ContractsService);

  public submitReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as Admission;

      await this.contracts.registerSubmission(body);

      res.status(200).json({ validation: true });
    } catch (error) {
      next(error);
    }
  };
}
