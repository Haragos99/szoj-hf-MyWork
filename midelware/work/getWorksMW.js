const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const WorkModel = requireOption(objectrepository, 'WorkModel');

    return function(req, res, next) {
        if (typeof res.locals.category === 'undefined') {
            return next();
        }

        WorkModel.find({ _category: res.locals.category._id }, (err, works) => {
            if (err) {
                return next(err);
            }

            res.locals.works = works;
            return next();
        });
    };
};