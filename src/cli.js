import program from 'commander';
import gendiff from '.';

export default () => {
  program
    .version('1.2.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .action((first, second) => console.log(gendiff(first, second, program.format)));

  program.parse(process.argv);
};
