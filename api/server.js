var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vuetradedb", {
    useNewUrlParser: true
}).then(
    () => {
        console.log('Database connection is successful')
    },
    err => {
        console.log('Error when connecting to the database' + err)
    }
);
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

console.log('processing request ');

var todo = require('./routes/routes.js');
app.use('/api/todo', todo);

const note = require('./models/Note.js');
app.use('/api/note', require('./crud')(note));

/*
app.all("*", function (req, resp, next) {
    console.log(req); // do anything you want here
    next();
});
*/

var port = process.env.PORT || 4000;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
