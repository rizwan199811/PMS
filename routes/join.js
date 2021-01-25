
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
router.get('/',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var perPage = 3;
    var page = req.params.page || 1;
    var options = {
      offset:   1, 
      limit:    3
  };
    passwordModule.aggregate([
        {
          $lookup:
            {
              from: "password_category",
              localField: "password_category_name",
              foreignField: "password_name",
              as: "pass_catDetails"
            }
        }
    
    ]).exec(function(err,result){
        if(err) throw err;
        res.send(result);
        console.log();
    })
  });
  
  router.get('/:page',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var perPage = 2;
    var page = req.params.page || 1;
    passwordModule.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err,data){
      if(err) throw err;
      passwordModule.countDocuments({}).exec((err,count)=>{ 
      res.render('view_all_category', { title: 'Password category',loginUser:loginUser,records:data,current: page,pages: Math.ceil(count / perPage) });  
    })
  });
  });
  router.get('/edit/:id',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var Id=req.params.id;
    var getPassDetails=passwordModule.findById({_id:Id});
    getPassDetails.exec(function(err,data){
      if(err) throw err;
      getPassword.exec(function(err,data1){
        res.render('editPasswordDetails', { title: 'Password category',loginUser:loginUser,records:data1,record:data,success:'' });  
      })
    })
    
  });
  
  router.post('/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var passcat= req.body.pass_cat;
    var project_name= req.body.project_name;
    var pass_details= req.body.pass_details;
    passwordModule.findByIdAndUpdate(id,{password_category:passcat,project_name:project_name,password_detail:pass_details}).exec(function(err){
    if(err) throw err;
      var getPassDetails=passwordModule.findById({_id:id});
    getPassDetails.exec(function(err,data){
  if(err) throw err;
  getPassword.exec(function(err,data1){
  res.render('editPasswordDetails', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'Password Updated Successfully' });
  });
  });
  });
  });
  router.get('/delete/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('LoginUserToken');
    var Id=req.params.id;
    var passdelete=passwordModule.findByIdAndDelete(Id);
    passdelete.exec(function(err){
  if(err) throw err;
  res.redirect('/view-password');
    });
  
  });
module.exports = router;