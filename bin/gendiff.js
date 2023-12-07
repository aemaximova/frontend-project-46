#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const formatName = options.format;
    console.log(genDiff(filepath1, filepath2, formatName));
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format (default: "stylish")', 'stylish')
  .parse(process.argv);
