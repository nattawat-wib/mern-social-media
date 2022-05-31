const express = require('express');
const app = express();
const cors = require('cors');
const cookieParse = require('cookie-parser');
const xss = require('xss-clean');
const sanitize = require("express-mongo-sanitize");

const memberRouter = require('./routes/member-route');

const port = process.env.PORT || 8080;

require('dotenv').config();
require('./db');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(sanitize());

app.use('/member', memberRouter)

app.listen(port, () => {
    console.log(`server is starting at port ... ${port}`);
})