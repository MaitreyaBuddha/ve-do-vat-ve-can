// models/computeUnit.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class ComputeUnit extends Model {
  public id!: string;
  public workerNodeId!: string;
  public timestamp!: Date;
  public workload!: number;
}

ComputeUnit.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workerNodeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workload: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'computeUnits',
  },
);