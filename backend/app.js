const express = require('express')
const cors = require('cors');
const { db } = require('./config/db');
const {readdirSync} = require('fs')
const app = express()
const path = require('path');

require('dotenv').config()

const PORT = process.env.PORT 
const CORS_URL=process.env.CORS_URL
//middlewares
app.use(express.json())
app.use(cors(CORS_URL))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000);

console.log(__dirname);

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}


server()

