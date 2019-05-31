const vorpal = require('vorpal')();
const path = require('path');
const fs = require('fs');
const tpl = require('./tpl');

function validateRootDir(args) {
    const rootDir = path.join(process.cwd(), args.rootDir || 'dist');
    if (!fs.existsSync(rootDir)) {
        return `can't find dir: ${rootDir};`;
    }
    args.rootDir = rootDir;
    return true;
}

function genTemplate(rootDir, dryrun) {
    console.log(`\x1b[33m
⏳ Generating templates @ ${rootDir}...\x1b[0m`);
    if (dryrun) {
        console.log(`\x1b[31m>>> DRY RUN MODE`);
    }
    tpl.walk(rootDir, dryrun ? tpl.dryrun : tpl.save);
    console.log(`\x1b[32m
✔️ templates generated.\x1b[0m
`);
}

vorpal
    .command('tpl [rootDir]')
    .description(`Make files in "rootDir" as web content templates.
"rootDir" is default as "./dist" if not specified.`)
    .option('-d, --dryrun', 'Run the templatization process without saving files')
    .validate(args => validateRootDir(args))
    .action((args, callback) => {
        const isDryRun = args.options.dryrun;
        genTemplate(args.rootDir, isDryRun);
    });

console.log(`\x1b[35m
-----------------------------------------------
         🕷🕷🕷 LOLTH POST BUILD 🕷🕷🕷         
-----------------------------------------------`);

vorpal.parse(process.argv);