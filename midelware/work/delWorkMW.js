const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.work === 'undefined') {
            return next();
        }

        res.locals.work.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/work/${res.locals.category._id}`);
        });
    };
};