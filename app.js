const express = require('express');
const http = require('http')
const socketIO = require('socket.io')

const mongoose = require('mongoose');
const users = require('./src/routes/user');
const times = require('./src/routes/timeRecord')
const payments = require('./src/routes/payment')
const app = express();
const port = 4001;
var cors = require('cors');

// app.use(express.urlencoded())

app.use(cors())

mongoose.connect('mongodb://localhost/schTimer',  { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false,
 }).then(()=> console.log("Connected to mongoDB"))

 app.use(express.json()) 
    app.use (express.urlencoded({extended: false}))

    
app.get('/', (req, res) => {
    res.send("I am working")
})

app.use('/users', users);

app.use('/times', times);

app.use('/payments', payments);

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('1    New client connected')

    // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('changeColor', (kids) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('2    In on on method: ', kids)
    io.sockets.emit('changeColor', kids)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))