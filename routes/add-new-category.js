const { check, validationResult } = require('express-validator');
var userModule=require('../modules/user');
var passwordModule=require('../modules/add_new_password');
var passwordcategoryModule=require('../modules/password_category');
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var getPasswordcategory=passwordcategoryModule.find({});
var getPassword=passwordModule.find({});
/* GET home page. */
 function checkLoginUser(req,res,next){
  var Usertoken=localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(Usertoken, 'LoginToken');
  } catch(err) {
    res.redirect('/');
  }
  return next();
}
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
router.get('/',checkLoginUser ,  function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
      res.render('add_new_category', { title: 'Password category',loginUser:loginUser ,errors:'',success:''});
  });
  router.post('/',checkLoginUser ,[ check('passwordCategory','Enter Password Category Name Please').isLength({ min: 1 })],function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      res.render('add_new_category', { title: 'Password category',loginUser:loginUser,errors:errors.mapped(),success:''});  
    }
    else{
      var password_category=req.body.passwordCategory;
      var password_categoryDetails=new passwordcategoryModule({password_category_name:password_category});
        password_categoryDetails.save(function(err,doc){
      if(err) throw err;
      res.render('add_new_category', { title: 'Password category',loginUser:loginUser,errors:'',success:'Password Category Name saved successfully' });
      });
    
  }
  });
module.exports = router;