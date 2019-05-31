const fs = require('fs');
const path = require('path');
const $ = require('cheerio');

const TEMPLATE_REPLACE_TEXT = '{{ .BaseURL }}'
const SCAN_TAGS = ['link', 'script', 'a', 'img'];
const REF_ATTRS = ['href', 'src'];
const REMOTE_PATH_PREFIXES = ['http:', 'https:', '//', TEMPLATE_REPLACE_TEXT];
const FILE_EXTS = ['.html', '.htm'];

function makeTemplate(filepath) {
    const root = $.load(fs.readFileSync(filepath));
    const elList = SCAN_TAGS.map(tag => root(tag).toArray()).reduce(
        (list, el) => {
            list.push(...el);
            return list;
        }, []
    );
    elList.forEach(updateRefAttrs);
    return root.html();
}

function updateRefAttrs(el) {
    REF_ATTRS.forEach(attr => {
        const attrVal = $(el).attr(attr);
        if (attrVal == null) return;
        const newVal = convertRelPath(attrVal);
        if (newVal) {
            $(el).attr(attr, newVal);
            console.log('\x1b[32mFOUND\x1b[0m', `<${el.tagName}> `, `${attrVal} → ${newVal}`);
        }
    });
}

function convertRelPath(oldPath) {
    for (const prefix of REMOTE_PATH_PREFIXES) {
        if (oldPath.startsWith(prefix)) return null;
    }
    return TEMPLATE_REPLACE_TEXT + path.join('/', oldPath);
}

function dryrun(filepath) {
    makeTemplate(filepath);
}

function save(filepath) {
    const template = makeTemplate(filepath);
    fs.writeFileSync(filepath, template);
}

function walk(dir, func) {
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        const ext = path.extname(file);
        if (FILE_EXTS.indexOf(ext) < 0) return;
        const filepath = path.join(dir, file)
        if (!fs.statSync(filepath).isFile) return;
        console.log(`\x1b[34m🕷 Processing ${file}...\x1b[0m`);
        func(filepath);
    })
}

module.exports = {
    walk,
    dryrun,
    save,
};