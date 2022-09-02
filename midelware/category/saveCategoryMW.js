const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CategoryModel = requireOption(objectrepository, 'CategoryModel');
  
    return function(req, res, next) {

        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.timetype === 'undefined' 
        ) 
        {
            return next();
        }
        if (typeof res.locals.category === 'undefined') {
            res.locals.category = new CategoryModel();
        }

        res.locals.category.name = req.body.name;
        res.locals.category.timetype = req.body.timetype;

        res.locals.category.save(err => {
            if (err) {
                return next(err);
            }
           
            return res.redirect('/category');
        });
    };
};