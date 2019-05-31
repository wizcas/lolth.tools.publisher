const tpl = require('./tpl');
const validators = require('../helpers/validators');

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

module.exports = function (vorpal, options) {
    vorpal
        .command('tpl [rootDir]')
        .description(`Make files in "rootDir" as web content templates.
"rootDir" is default as "./dist" if not specified.`)
        .option('-d, --dryrun', 'Run the templatization process without saving files')
        .validate(args => validators.validateDir(args, 'rootDir', 'dist'))
        .action((args, callback) => {
            const isDryRun = args.options.dryrun;
            genTemplate(args.rootDir, isDryRun);
        });
    vorpal.parse(process.argv);
};