/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { spawnSync, spawn, execSync } from 'child_process';
import { InfernodeError } from '../utils/globalErrorHandler';

type ApplicationControllerType = {
  nodeStop: (req: Request, res: Response, next: NextFunction) => void;
};

const applicationController: ApplicationControllerType = {
  nodeStop: (req: Request, res: Response, next: NextFunction) => {

  },
};

export default applicationController;
