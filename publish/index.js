const validators = require('../helpers/validators');
const con = require('../helpers/con');
const {
    exec
} = require('child_process');

function pubToS3(bucket, rootDir, isDryRun) {
    let cmd = `aws s3 sync ${rootDir}/ ${bucket} --acl public-read`
    if (isDryRun) {
        cmd += ' --dryrun';
        con.printDryRun();
    }
    console.log('Executing:', cmd);
    const child = exec(cmd, {
        detached: true,
        stdio: ['ignore', 1, 2],
    });
    child.unref();
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}

module.exports = function (vorpal, options) {
    vorpal
        .command('pub s3 <bucket> [rootDir]')
        .description(`Publish files in "rootDir", which is "./dist" if not specified, to AWS S3`)
        .option('-d --dryrun', 'Execute the publication in dry run mode')
        .validate(args => {
            if (!args.bucket || !args.bucket.startsWith('s3://')) {
                return 'bucket ID must be provided and begins with "s3://", for example: "s3://foo-bucket"';
            }
            return validators.validateDir(args, 'rootDir', 'dist');
        })
        .action((args, callback) => {
            const isDryRun = args.options.dryrun;
            pubToS3(args.bucket, args.rootDir, args.options.dryrun)
        });
};