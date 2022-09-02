const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const WorkModel = requireOption(objectrepository, 'WorkModel');
    
    return function(req, res, next) {
        
        WorkModel.findOne(
            {
                _id: req.params.workid
            },
            (err, work) => {
                if (err || !work) {
                   
                    return next(err);
                }

                res.locals.work = work;
                return next();
            }
        );
    };
};