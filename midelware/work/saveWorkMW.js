const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const WorkModel = requireOption(objectrepository, 'WorkModel');

    return function(req, res, next) {
        if (
            //typeof req.body.name === 'undefined' ||
            typeof req.body.description === 'undefined' ||
            typeof res.locals.category === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.work === 'undefined') {
            res.locals.work = new WorkModel();
        }
        if(req.file){
             res.locals.work.name = req.file.filename;
        }
        res.locals.work.description = req.body.description;
        res.locals.work._category = res.locals.category._id;

        res.locals.work.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/work/${res.locals.category._id}`);
        });
    };
};