import path from 'path';
import { ensureDirSync } from 'fs-extra';
import logger from './logging';

function makeDataDirs(): void {
  try {
    ensureDirSync(path.resolve(__dirname, '../../database/'));
    ensureDirSync(path.resolve(__dirname, '../../database/captures'));
    ensureDirSync(path.resolve(__dirname, '../../database/folded'));
    ensureDirSync(path.resolve(__dirname, '../../database/SVGs'));
    ensureDirSync(path.resolve(__dirname, '../../database/uploads'));
  } catch (err) {
    logger.error('Failed to create data folders:', err);
  }
}

export default makeDataDirs;
