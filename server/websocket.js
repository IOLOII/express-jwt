const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log("socket connect");
})
app.get('/socket', (req, res) => {
  console.log(req.url);
})
