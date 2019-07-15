const mongoose = require('mongoose');

// mongoose.connect('mongodb://<user>:<password>@ds127644.mlab.com:27644/nodeauth', {
mongoose.connect('mongodb://localhost:27017/vuetradedb', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected to database');
}).catch(() => {
    console.log('failed connected to database');
});
