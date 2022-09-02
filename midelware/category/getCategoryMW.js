const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CategoryModel = requireOption(objectrepository, 'CategoryModel');

    return function(req, res, next) {
        CategoryModel.findOne({ _id: req.params.categoryid }, (err, category) => {
            if (err || !category) {
                return next(err);
            }

            res.locals.category = category;
            return next();
        });
    };
};