const express = require("express");
const helmet =require('helmet')

const studentsRouter = require('./students/studentsRouter')

const Students = require('./students/studentsModel')

const server = express();

server.use(helmet())
server.use(express.json());
server.use('/api/students', studentsRouter)

server.get("/", (req, res) => {
  res.status(200).json({ Hello: "What's up folks?" });
});



server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Bad mistake, Engineer!", err 
    })
})

module.exports = server;
