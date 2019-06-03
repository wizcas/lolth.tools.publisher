#!/usr/bin/env node

const vorpal = require('vorpal')();
const chalk = require('chalk');

/**
 * 🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷🕷
 */
function printTitle() {
    const name =
        chalk.white('LO') + chalk.magenta('LTH ') +
        chalk.white('PUB') + chalk.magenta('LISHER');
    console.log(`
${chalk.magenta('-------------------------------------------')}
  / _ \\
\\_\\(_)/_/   ${name}
 _//o\\\\_    ${chalk.green('toolset of website publication')}
  /   \\        
${chalk.magenta('-------------------------------------------')}
run ${chalk.yellow('lopub help')} for instructions
    `);
}

printTitle();
vorpal
    .use(require('./postprocess'))
    .use(require('./publish'))
    .parse(process.argv)