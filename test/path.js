const path = require('path')
// console.log(path);
let baseName = path.basename('/asdas/f/as/fga/index.html', '.html')
// console.log(baseName);
// console.log(process.env.path);
// console.log(process.env.PATH.split(path.delimiter));
let format = path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt'
});
// console.log(format);
let joinPath = path.join('/目录1', '目录2', '目录3', '/目录4/fff/11/u/000', '/op', 'mjjk', 'asd/asd/fff/ffs')
// console.log(joinPath);

// console.log(path.normalize('/asd/fff/rtt/rq/1'));
// console.log(path.join(process.cwd(), 'mock'));
// console.log(require);