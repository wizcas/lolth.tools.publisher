#!/usr/bin/env node

const vorpal = require('vorpal')();
const postprocess = require('./postprocess');
const validators = require('./helpers/validators');
const chalk = require('chalk');
const {
    exec
} = require('child_process');

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
        const cmd = `aws s3 sync ${args.folder}/ ${args.bucket} --acl public-read`
        console.log('Executing:', cmd);
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    });

printTitle();
vorpal.use(postprocess).parse(process.argv)