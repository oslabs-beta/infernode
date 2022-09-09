#!/usr/bin/env node
import open from 'open';
import logger from '../utils/logging';
import infernode from '../index';

// opens the url in the default browser
open(`http://localhost:${infernode.port}/`)
  .then(() => {
    console.log(`Infernode started: http://localhost:${infernode.port}/`);
    console.log('Press \'control + c\' to exit');
  })
  .catch((err) => logger.error(err));
