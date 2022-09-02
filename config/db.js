
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CG3EI7', { useNewUrlParser: true });

module.exports = mongoose;