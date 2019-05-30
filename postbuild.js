/**
 * 编译后处理脚本
 * 
 * 用于在编译后整理HTML中的相对路径链接，添加模板占位符，
 * 以便Web服务器渲染时将其替换成对应的CDN/S3等主机地址
 */

const fs = require('fs');
const path = require('path');

const arg = process.argv[2]

if (arg === '-h' || arg === '--help') {
    console.log(`
    Postprocess built assets of website. See README.md for details.
    Specify relative path to build output folder as the only argument. Or
    omit it for '{CWD}/dist' as default setting.


Usage:
    
    node postbuild.js            [DIST_FOLDER_REL_PATH_TO_CWD]
    node postbuild.js -h|--help  Show this help
`);
    return;
}

const DIST_ROOT = path.resolve(process.cwd(), arg || 'dist');
const TEMPLATE_REPLACE_TEXT = '{{ .BaseUrl }}'
/**
 * 正则说明：
 * 搜索html文件中的本地url链接，并忽略：
 * - `http:`和`https:`开头的
 * - `//`开头的，因为之前碰到过阿里的特殊地址，形如`//g.alicdn.com/`
 * - 形如`{{ .BaseUrl }}`的已经包含BaseUrl占位符的
 * 
 * 匹配结果group说明：
 * 
 * - `0`: Tag中含资源链接的完整Attribute，如`src="main.js"`
 * - `1`: Attribute的开头部分，如`src="`，处理时要在它之后加上模板占位符
 * - `2`: Attribute名称，如`src`
 * - `4`: 实际资源链接地址，如`main.js`
 */
const SRC_REGEX = /((src|href)=")(?!(http:|https:|\/\/|{{ \.BaseUrl }}))(.+)"/;

function makeIndexTemplate() {
    console.log(`\x1b[33m
--------------------------------------------------
|               POST BUILD PROCESS               |
--------------------------------------------------

⏳ Generating index template...
`);
    const indexFileName = path.resolve(DIST_ROOT, 'index.html')
    const lines = fs.readFileSync(indexFileName)
        .toString()
        .split('\n').map(ln => ln.trim());
    let lineNum = 1;
    let output = '';
    for (let line of lines) {
        let offset = 0;
        let matches;
        do {
            const input = line.substr(offset);
            matches = SRC_REGEX.exec(input);
            if (matches) {
                const replaced = matches[1];
                const assetUrl = matches[4];
                let replacer = replaced + TEMPLATE_REPLACE_TEXT;
                if (!assetUrl.startsWith('/')) {
                    // 为资源路径则加上路径分隔符
                    replacer += '/';
                }
                console.log('\x1b[32mFOUND\x1b[0m', `${lineNum}:${matches.index}\t`, `${replaced}->${replacer}`);
                input.replace(replaced, replacer);
                line = line.substr(0, offset) + input.substr(0, matches.index) + replacer + input.substr(matches.index + replaced.length);
                offset += matches.index + replacer.length;
            }
        } while (matches);
        output += line + '\n';
        lineNum++;
    }
    fs.writeFileSync(indexFileName, output);
    console.log(`\x1b[32m
✔️ Index template is saved. 
`);
}

makeIndexTemplate();