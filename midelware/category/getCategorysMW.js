const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CategoryModel = requireOption(objectrepository, 'CategoryModel');

    return function(req, res, next) {
        CategoryModel.find({}, (err, categorys) => {
            if (err) {
                return next(err);
            }

            res.locals.categorys = categorys;
            return next();
        });
    };
};