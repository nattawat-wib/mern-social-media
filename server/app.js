const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const sanitize = require("express-mongo-sanitize");

const memberRouter = require('./routes/member-route');
const postRouter = require('./routes/post-route');

const port = process.env.PORT || 8080;

require('dotenv').config();
require('./db');

app.use(express.static(`${__dirname}/uploads`))

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(sanitize());

app.use('/member', memberRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`server is starting at port ... ${port}`);
})