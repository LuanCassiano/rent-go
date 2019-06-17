const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tcc', {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose