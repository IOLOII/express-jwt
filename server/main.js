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
app.listen(
    '2414', () => { }
)
console.log(expressJwt);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressJwt({
    secret: secret,
    algorithms: ['HS256']   // 某次升级之后要求配置
}).unless({
    path: ['/', '/login']   // 白名单
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
// COMMENT: 404处理
app.use((req, res) => {
    console.log(`${req.method}:${req.headers.host}${req.url}`);
    res.status(404).json({
        message: '404'
    })
})