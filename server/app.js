const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const sanitize = require("express-mongo-sanitize");

const memberRouter = require('./routes/member-route');
const postRouter = require('./routes/post-route');
const authRouter = require('./routes/auth-route');
const commentRouter = require('./routes/comment-route');

const path = require('path');

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

app.use('/auth', authRouter);
app.use('/member', memberRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.use("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });

    console.log(2);
}

app.listen(port, () => {
    console.log(`server is starting at port ... ${port}`);
})