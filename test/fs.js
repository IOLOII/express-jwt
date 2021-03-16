const { throws } = require('assert')
const fs = require('fs')

module.exports = () => {

    // NOTE: // console.log(process.cwd()); //  E:\project\other\JWT-test\espress-jwt 当前工作目录/不是这份js目录
    // 而在nodejs中是相对于process.cwd()目录
    // fs.open('C:/Users/MyWord/Downloads/icon-car.png', (err, fd) => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log(`fd:${fd}`);
    //     fs.close(fd, (err) => {
    //         if (err) throw err
    //     })
    // })
    async function print(path) {
        const dir = await fs.promises.opendir(path);
        console.log(dir);
        for await (const dirent of dir) {
            console.log(`${dirent.name}: ${dirent.isDirectory()}, ${dirent.isFile()}, ${dirent.isSocket()}`);
        }
    }
    // print('./').catch(console.error);
    // let fsWatcher = fs.watch('./test/fs.js', (eventType, filename) => {
    //     console.log(`${eventType}, ${filename}`);
    // })
    let stream = fs.createReadStream('./1.txt', { encoding: 'utf-8' })
    stream.on('data', data => {
        console.log(data);
    })
    stream.on('end', () => {
        console.log('finish');
    })
    // console.log(stream);
    // fs.open('./test/fs.js', (err, fd) => {
    //     console.log(err, fd);
    // })
    // fs.writeFile('./1.txt', 'kla;sdkl;askd', function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // })
}
