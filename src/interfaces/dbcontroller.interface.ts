import { Request, Response, NextFunction } from 'express';

interface UpdateBody {
  id: number;
}

interface DbCInterface {
  createEmptyRecord: (req: Request, res: Response, next: NextFunction) => void;
  deleteRecord: (req: Request, res: Response, next: NextFunction) => void;
  getAllRows: (req: Request, res: Response, next: NextFunction) => void;
  updateRecord: (req: Request, res: Response, next: NextFunction) => void;
}

interface CbThis {
  lastID: number;
  changes: [];
}

export { UpdateBody, DbCInterface, CbThis };
