const path = require('path');
const fs = require('fs');

function validateDir(args, field, defaultValue) {
    const dir = path.join(process.cwd(), args[field] || defaultValue);
    if (!fs.existsSync(dir)) {
        return `can't find dir: ${dir};`;
    }
    args[field] = dir;
    return true;
}

module.exports = {
    validateDir,
};