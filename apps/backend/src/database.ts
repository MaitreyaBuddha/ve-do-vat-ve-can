import { Sequelize } from 'sequelize';
import { ComputeUnit } from './models/computeUnit.model';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Create tables
sequelize.sync();