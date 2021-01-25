var userModule=require('../modules/user');
var passwordModule=require('../modules/add_new_password');
var passwordcategoryModule=require('../modules/password_category');
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
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
function checkUsername(req,res,next){
  var uname=req.body.uname;
  var checkexistingusername=userModule.findOne({username:uname});
  checkexistingusername.exec((err,data)=>{
if(err)throw err;
if(data){
  return res.render('sign_up', { title: 'Sign Up',msg:'Username Already exist'});
}
next();
  });
}
router.get('/',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    getPasswordcategory.exec(function(err,data1){
  if(err) throw err;
  res.render('password_category', { title: 'Password category',loginUser:loginUser,records:data1});
    });
  
  });
  router.get('/delete:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var password_cat=req.params.id;
    var passdelete=passwordcategoryModule.findByIdAndDelete(password_cat);
    passdelete.exec(function(err){
  if(err) throw err;
  res.redirect('/');
    });
  
  });
  router.get('/edit:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var password_cat=req.params.id;
    var passedit=passwordcategoryModule.findById(password_cat);
    passedit.exec(function(err,data){
  if(err) throw err;
  res.render('edit_new_password', { title: 'Password category',loginUser:loginUser,records:data,success:'',errors:'',id:password_cat});
    });
  });
  router.post('/edit',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var password_cat=req.body.id;
    var password_cat_name=req.body.passwordCategory;
    var passedit=passwordcategoryModule.findOneAndUpdate(password_cat,{password_category_name:password_cat_name});
    passedit.exec(function(err){
  if(err) throw err;
  res.redirect('/');
    });
  });
module.exports = router;