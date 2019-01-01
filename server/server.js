require('./config/config');
require('./db/mongoose');

const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(logger('dev'));


app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.use(function (err, req, res, next) {
    console.log(`TEST ERROR ${err}`);
    if (!err.status) {
        err.status = 500
    }
    if (!err.message) {
        err.message = "My test some error"
    }
    res.status(err.status).send(err)
});

app.listen(port, () => {
    console.log(`Started on port ${port}`)
});




//
// app.use((next) => {
//     console.log("My middleware 1");
// });
// app.use((res, next) => {
//     console.log("My middleware 2");
// });
// app.use((req, res, next) => {
//     console.log("My middleware 3");
// });
// app.use((err, req, res, next) => {
//     console.log("My middleware 4");
// });
module.exports = {app};