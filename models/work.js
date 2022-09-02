
const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Work = db.model('Work', {
    name: String,
    description: String,
    _category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = Work;