# lolth.tools.publisher

A toolset for publishing static website, companied with project `lolth.server.static`

It is currently for:

- Convert HTML files into handlebars templates with `{{ .BaseURL }}` placeholders for any relative path
- Publish asset files to S3 storage

## Install

Install with yarn 

``` bash
yarn -D lolth.tools.publisher
```

or npm

``` bash
npm install -D lolth.tools.publisher
```

## Make Templates

``` bash
lopath tpl [ROOT_DIR] [-d|--dryrun]
```

Scan HTML files recursively in `ROOT_DIR` and make templates. Note that if `ROOT_DIR` is not specified, folder *dist* will be used as default.

**HTML files will be overridden by this command.**

You can run this command with flag `-d` or `--dryrun` to test if there's any error and for checking if all relative paths are detected.

## Publish To Server

##### To AWS S3

> For now this is the only service supported. More services may be added on need.

``` bash
lopath pub s3 <BUCKET> [ROOT_DIR] [-d|--dryrun]
```

Sync and push files in `ROOT_DIR` to an AWS S3 bucket. Note that if `ROOT_DIR` is not specified, folder *dist* will be used as default.

`BUCKET` refers to an S3 bucket identifier, which must starts with `s3://`. Take `s3://foo-bucket` as an example.

You can run this command with flag `-d` or `--dryrun` to check files to be synchronized before actually pushing them.