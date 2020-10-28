// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// // Node.js의 native Promise 사용
// mongoose.Promise = global.Promise;

// // CONNECT TO MONGODB SERVER
// mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
//   .then(() => console.log('Successfully connected to mongodb'))
//   .catch(e => console.error(e));

app.use("/", require('./src/routes/docker'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));