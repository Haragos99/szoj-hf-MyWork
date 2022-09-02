const authMW = require('../midelware/auth/authMW');
const renderMW = require('../midelware/auth/renderMW');
const checkPassMW = require('../midelware/auth/checkPassMW');
const delWorkMW = require('../midelware/work/delWorkMW');
const getWorksMW = require('../midelware/work/getWorksMW');
const getWorkMW = require('../midelware/work/getWorkMW');
const saveWorkMW = require('../midelware/work/saveWorkMW');
const delCategoryMW = require('../midelware/category/delCategoryMW');
const getCategorysMW = require('../midelware/category/getCategorysMW');
const getCategoryMW = require('../midelware/category/getCategoryMW');
const saveCategoryMW = require('../midelware/category/saveCategoryMW');
const multer = require('multer');
const WorkModel = require('../models/work');
const CategoryModel = require('../models/category');


module.exports = function(app) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix +'.png')
        }
      })
    const upload = multer({ dest: 'uploads/',storage })
    const objRepo = {
        WorkModel: WorkModel,
        CategoryModel: CategoryModel
    };

    app.use(
        '/category/new',
        authMW(objRepo),
        saveCategoryMW(objRepo),
        renderMW(objRepo,'AddnewCategory')
    );
    app.use(
        '/category/edit/:categoryid',
        authMW(objRepo),
        getCategoryMW(objRepo),
        saveCategoryMW(objRepo),
        renderMW(objRepo,'AddnewCategory')
    );
    app.get(
        '/category/del/:categoryid',
        authMW(objRepo),
        getCategoryMW(objRepo),
        delCategoryMW(objRepo)
    );  
    app.get(
        '/category',
        authMW(objRepo),
        getCategorysMW(objRepo),
        renderMW(objRepo,'Category')
    );  
    //Work
    app.use(
        '/work/:categoryid/new',
        authMW(objRepo),
        upload.single('work'),
        getCategoryMW(objRepo),
        saveWorkMW(objRepo),
        renderMW(objRepo,'Addnew')
    );
    app.use(
        '/work/:categoryid/edit/:workid',
        authMW(objRepo),
        upload.single('work'),
        getCategoryMW(objRepo),
        getWorkMW(objRepo),
        saveWorkMW(objRepo),
        renderMW(objRepo,'Addnew')
    );
    app.get(
        '/work/:categoryid/del/:workid',
        authMW(objRepo),
        getCategoryMW(objRepo),
        getWorkMW(objRepo),
        delWorkMW(objRepo),
        renderMW(objRepo,'Addnew')
    ); 
    app.get(
        '/work/:categoryid/',
        authMW(objRepo),
        getCategoryMW(objRepo),
        getWorksMW(objRepo),
        renderMW(objRepo,'Work')
    ); 
    app.get('/me', authMW(objRepo),renderMW(objRepo,'Me'));
    app.use('/', checkPassMW(objRepo), renderMW(objRepo, 'Admin'));
    
/*
    app.use(
        '/work/:idcategory/new',
        authMW(objRepo),
        getCategoryMW(objRepo),
        saveWorkMW(objRepo),
        renderMW(objRepo,'Addnew')
    );
    app.use(
        '/work/:idcategory/edit/:workid',
        authMW(objRepo),
        getCategoryMW(objRepo),
        getWorkMW(objRepo),
        saveWorkMW(objRepo),
        renderMW(objRepo,'UpdateWork')
    );

    app.get(
        '/work/:idcategory/del/:workid',
        authMW(objRepo),
        getCategoryMW(objRepo),
        getWorkMW(objRepo),
        delWorkMW(objRepo),
    );
    app.use(
        '/category/new',
        authMW(objRepo),
        saveCategoryMW(objRepo),
        renderMW(objRepo, 'AddnewCategory')
    );
    app.use(
        '/category/edit/:idcategory',
        authMW(objRepo),
        getCategoryMW(objRepo),
        saveCategoryMW(objRepo),
        renderMW(objRepo, 'Update')
    );

    app.get(
        '/category/del/:idcategory',
        authMW(objRepo),
        getCategoryMW(objRepo),
        delCategoryMW(objRepo),
        renderMW(objRepo,)
    );
    
    app.get(
        '/category/:workid',
        authMW(objRepo),
        getWorkMW(objRepo),
        getCategoryMW(objRepo),
        renderMW(objRepo, 'Menu')
    );
        // Amikor minden adatát kiírjuk egy oldalra
    app.get(
        '/work/:categoryid/:workid',
        authMW(objRepo),
        getWorkMW(objRepo),
        getCategoryMW(objRepo),
        renderMW(objRepo, 'SeeWork')
    );
    */
}