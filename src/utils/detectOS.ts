import { execSync } from 'child_process';

const detectOS = (): string => {
  const platformString = process.platform;
  switch (platformString) {
    case 'darwin':
      return 'mac';
    case 'linux':
      return 'linux';
    case 'win32':
      return 'windows';
    case 'aix':
    case 'freebsd':
    case 'openbsd':
    case 'sunos':
    case 'android':
      return 'unsupported';
    default:
      return 'unknown';
  }
};

const detectSupport = (): boolean => {
  const os = detectOS();
  return (!(os === 'unsupported' || os === 'unknown'));
};

const detectSudo = (): boolean => {
  const os = detectOS();
  let sudoCommands = '';
  let sudoAll = false;
  let sudoTrace = false;

  switch (os) {
    case 'mac':
    case 'linux':
      sudoCommands = execSync('sudo -l').toString();
      sudoAll = /\(ALL : ALL\) NOPASSWD: ALL/.test(sudoCommands);
      console.log(`Checking sudo all on ${os}: ${(sudoAll ? 'sufficient' : 'insufficient')}`);
      break;
    case 'windows':
      console.log('Sudo all unnecessary on windows');
      break;
    default:
      console.log('Unable to check sudo all on unsupported OS');
  }

  switch (os) {
    case 'mac':
      sudoTrace = /\(ALL\) NOPASSWD:.*\/usr\/sbin\/dtrace/.test(sudoCommands);
      console.log(`Checking dtrace sudo on ${os}: ${(sudoTrace ? 'sufficient' : 'insufficient')}`);
      break;
    case 'linux':
      sudoTrace = /\(ALL\) NOPASSWD:.*\/usr\/sbin\/perf/.test(sudoCommands);
      console.log(`Checking perf sudo on ${os}: ${(sudoTrace ? 'sufficient' : 'insufficient')}`);
      break;
    case 'windows':
      console.log('Specific sudo unnecessary on windows');
      break;
    default:
      console.log('Unable to check specific sudo on unsupported OS');
  }

  return (sudoAll || sudoTrace);
};

export { detectOS, detectSudo, detectSupport };
