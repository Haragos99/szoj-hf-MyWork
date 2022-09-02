const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Category = db.model('Category', {
    name: String,
    timetype: String
    
});

module.exports = Category;