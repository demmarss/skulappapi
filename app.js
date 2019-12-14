const express = require('express');
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

app.get('lcycle', ()=>{
    console.log('lycle responding')
    res.send('lcycle')
})

app.use('/users', users);

app.use('/times', times);

app.use('/payments', payments);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))