#!/usr/bin/env node

const vorpal = require('vorpal')();
const postprocess = require('./postprocess');
const validators = require('./helpers/validators');
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

vorpal
    .command('push <bucket> <folder>')
    .option('-d, --dryrun', 'Dry-run the sync process')
    .validate(args => validators.validateDir(args, 'rootDir', args.folder))
    .action(args => {
        console.log('bucket', args.bucket, 'folder', args.folder)
        // process.
    });

printTitle();
vorpal.use(postprocess).parse(process.argv)