
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'haragos') {
            req.session.belepve = true;
            return req.session.save(err => res.redirect('/category'));
        }

        res.locals.error = 'Hibás jelszó!';
        return next();
    };
};