
var userModule=require('../modules/user');
var passwordModule=require('../modules/add_new_password');
var passwordcategoryModule=require('../modules/password_category');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
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
  next();
}
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexistinguser=userModule.findOne({email:email});
  checkexistinguser.exec((err,data)=>{
if(err)throw err;
if(data){
  return res.render('sign_up', { title: 'Sign Up',msg:'Email Already exist'});
}
next();
  });
}

router.get('/',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    getPasswordcategory.exec(function(err,data){
      if(err) throw err;
      
      res.render('add_new_password', { title: 'Password category',loginUser:loginUser,records:data ,success:''});  
    })
  });
  router.post('/',checkLoginUser , function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var password_name=req.body.pass_cat;
    var password_Details=req.body.pass_details;
    var project_name=req.body.project_name;
    var password_categoryDetails=new passwordModule({password_name:password_name,project_name: project_name,password_detail:password_Details});
   password_categoryDetails.save(function(err,doc){
      getPasswordcategory.exec(function(err,data){
        if(err) throw err;
        res.render('add_new_password', { title: 'Password category',loginUser:loginUser,records:data,success:'Entered password details saved successfully'});
    });
  });
  });

module.exports = router;