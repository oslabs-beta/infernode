import { NextFunction, Request, Response } from 'express';
import { execSync } from 'child_process';

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
    console.log(`envController startup: detected ${(this.supported ? 'supported' : 'unsupported')} OS: ${this.os}`);
    console.log(`envController startup: sudo configuration is ${(this.sudo ? 'sufficient' : 'insufficient')}`);
  }

  private detectOS() {
    const platformString = process.platform;
    switch (platformString) {
      case 'darwin':
        this.os = 'mac';
        return;
      case 'linux':
        this.os = 'linux';
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
      case 'linux':
        sudoCommands = execSync('sudo -l').toString();
        sudoAll = /\(ALL : ALL\) NOPASSWD: ALL/.test(sudoCommands);
        console.log(`Checking sudo all on ${this.os}: ${(sudoAll ? 'sufficient' : 'insufficient')}`);
        break;
      case 'windows':
        console.log('Sudo all unnecessary on windows');
        break;
      default:
        console.log('Unable to check sudo all on unsupported OS');
    }

    switch (this.os) {
      case 'mac':
        sudoTrace = /\(ALL\) NOPASSWD:.*\/usr\/sbin\/dtrace/.test(sudoCommands);
        console.log(`Checking dtrace sudo on ${this.os}: ${(sudoTrace ? 'sufficient' : 'insufficient')}`);
        break;
      case 'linux':
        sudoTrace = /\(ALL\) NOPASSWD:.*\/usr\/sbin\/perf/.test(sudoCommands);
        console.log(`Checking perf sudo on ${this.os}: ${(sudoTrace ? 'sufficient' : 'insufficient')}`);
        break;
      case 'windows':
        console.log('Specific sudo unnecessary on windows');
        break;
      default:
        console.log('Unable to check specific sudo on unsupported OS');
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
