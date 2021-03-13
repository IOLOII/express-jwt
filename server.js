const express = require('express')
const app = express()
app.listen(
    '2414', () => {
        console.log('start');
    }
)
app.get(
    '/', (req, res) => {
        console.log(req, res);
    }
)
app.post(
    '/', (req, res) => {
        res.json(
            {
                message: 'hello',
                code: 200,
                data: {}
            }
        )
    }
)