import e, { NextFunction, Request, Response } from 'express';
import { execSync } from 'child_process';
import os from 'os';
import logger from '../utils/logging';

/**
 * Detects environment configuration for later reference by other middleware
 * In the future may also modify or setup the environment
 */
export default class EnvController {
  private os = 'unknown';

  private sudo = false;

  private supported = false;

  constructor() {
    this.detectOS();
    this.detectSupport();
    this.detectSudo();
    if (this.supported) {
      logger.info(`detected supported OS: ${this.os}`);
    } else {
      logger.error(`detected unsupported OS: ${this.os}`);
    }

    if (this.sudo) {
      logger.info('sudo configuration is sufficient');
    } else {
      logger.warn('sudo configuration is insufficient');
    }
  }

  private detectOS() {
    const platformString = process.platform;
    switch (platformString) {
      case 'darwin':
        this.os = 'mac';
        return;
      case 'linux':
        if (os.release().toLowerCase().includes('microsoft')) {
          this.os = 'windows';
        } else {
          this.os = 'linux';
        }
        return;
      case 'win32':
        this.os = 'windows';
        return;
      case 'aix':
      case 'freebsd':
      case 'openbsd':
      case 'sunos':
      case 'android':
        this.os = 'unsupported';
        return;
      default:
        this.os = 'unknown';
    }
  }

  private detectSupport() {
    this.supported = (!(this.os === 'unsupported' || this.os === 'unknown'));
  }

  private detectSudo() {
    let sudoCommands = '';
    let sudoAll = false;
    let sudoTrace = false;

    switch (this.os) {
      case 'mac':
        sudoCommands = execSync('sudo -l -n').toString();
        sudoAll = /\(ALL : ALL\) NOPASSWD: ALL/.test(sudoCommands);
        break;
      case 'linux':
        sudoAll = true;
        logger.trace(`Checking sudo all on ${this.os}: ${(sudoAll ? 'sufficient' : 'insufficient')}`);
        break;
      case 'windows':
        logger.trace('Sudo all unnecessary on windows');
        break;
      default:
        logger.trace('Unable to check sudo all on unsupported OS');
    }

    switch (this.os) {
      case 'mac':
        sudoTrace = /\(ALL\) NOPASSWD:.*\/usr\/sbin\/dtrace/.test(sudoCommands);
        logger.trace(`Checking dtrace sudo on ${this.os}: ${(sudoTrace ? 'sufficient' : 'insufficient')}`);
        break;
      case 'linux':
        // sudoTrace = /\(ALL\) NOPASSWD:.*\/usr\/sbin\/perf/.test(sudoCommands);
        sudoTrace = true;
        logger.trace(`Checking perf sudo on ${this.os}: ${(sudoTrace ? 'sufficient' : 'insufficient')}`);
        break;
      case 'windows':
        logger.trace('Specific sudo unnecessary on windows');
        break;
      default:
        logger.trace('Unable to check specific sudo on unsupported OS');
    }

    this.sudo = (sudoAll || sudoTrace);
  }

  /* Middleware for populating res.locals.env with env info */
  public detect = (_req: Request, res: Response, next: NextFunction): void => {
    res.locals.envOS = this.os;
    res.locals.envSudo = this.sudo;
    res.locals.envSupported = this.supported;
    next();
  };
}
