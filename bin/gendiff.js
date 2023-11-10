#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format');

program.command('gendiff');

program.parse(process.argv);

if (program.help) {
  console.log(program.outputHelp());
}
