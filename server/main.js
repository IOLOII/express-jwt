const express = require('express')
const bodyParser = require('body-parser')
// const fs_ts = require('../test/fs')
// const path_ts = require('../test/path')
// const global_ts = require('../test/global')


// COMMENT: 加密生成
const jwt = require('jsonwebtoken')
// COMMENT: 解密校验
const expressJwt = require('express-jwt')
// COMMENT: 秘钥
const secret = "token"

const app = express()
const http = require('http').createServer(app)
// socket.io document   https://socket.io/docs/v3/index.html
// npm https://www.npmjs.com/package/socket.io
const io = require('socket.io')(http)

let socketCount = 0
// console.log(expressJwt);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressJwt({
    secret: secret,
    algorithms: ['HS256']   // 某次升级之后要求配置
}).unless({
    path: ['/', '/login', '/socket']   // 白名单
}))
app.use((err, req, res, next) => {
    if (err.code === "invalid_token") res.status(401).send(err.message)
})
app.post('/', (req, res) => {
    res.json(
        {
            message: 'hello',
            code: 200,
            data: {}
        }
    )
})
app.post('/login', (req, res) => {
    if (req.body.userName && req.body.password) {
        res.json(
            {
                token: jwt.sign(
                    req.body,
                    secret,
                    { expiresIn: 900 }
                ),
                code: 200,
                massage: '登陆成功'
            }
        )
    } else {
        res.status(500).json({
            massage: 'error'
        })
    }
})
app.post('/checkToken', expressJwt({ secret: secret, algorithms: ['HS256'] }), (req, res) => {
    res.send(`来访用户: ${req.user.userName}`)
})
app.get('/socket', (req, res) => {
    // res.json("123")
    // console.log(process.cwd());
    // console.log(__dirname);
    res.sendFile(process.cwd() + '/views/socketIndex.html')
})
io.on('connection', (socket) => {
    console.log('a user connected', socketCount += 1);
    socket.on('disconnect', () => {
        console.log('user disconnected', socketCount -= 1);
    });

    // TODO: 文档: https://socket.io/docs/v3/broadcasting-events/
    setInterval(() => {
        socket.emit("hello", "can you hear me?", 1, 2, "abc");
    }, 1000)
    socket.broadcast.emit("hello", "world");
});
// COMMENT: 404处理
app.use((req, res) => {
    console.log(`${req.method}:${req.headers.host}${req.url}`);
    res.status(404).json({
        message: '404'
    })
})
// 为了 socket app.listen改http.listen
http.listen(
    '2414', () => {
        console.log('listening on *:2414');
    }
)
