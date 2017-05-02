import program from 'commander';

export default () => {
  program
   .version('1.0.1')
   .arguments('<firstConfig> <secondConfig>')
   .description('Compares two configuration files and shows a difference.')
   .option('-f, --format [type]', 'Output format')
   .action(() => console.log('Hello!'));

  program.parse(process.argv);
};
