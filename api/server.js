const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const dbConfig = require("../database/dbConfig")

const sessionConfig = {
    name: "token",
    secret: "secrets is hard",
    resave: false,
    savedUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}

server.use(session(sessionConfig))

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate(), jokesRouter);

server.use((err, req, res, next) => {
    console.log("Error:", err)
    res.status(500).json({
      message: "Something went wrong",
    })
})

module.exports = server;
