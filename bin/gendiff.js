#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';
import path from 'path';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);
