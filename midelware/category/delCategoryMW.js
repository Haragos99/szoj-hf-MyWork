const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.category === 'undefined') {
            return next();
        }

        res.locals.category.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/category');
        });
    };
};