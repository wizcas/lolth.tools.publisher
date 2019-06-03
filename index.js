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
${chalk.magenta('-------------------------------')}
        ${name}
${chalk.magenta('-------------------------------')}
    `);
}

printTitle();
vorpal
    .use(require('./postprocess'))
    .use(require('./publish'))
    .parse(process.argv)