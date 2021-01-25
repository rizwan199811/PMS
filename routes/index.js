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
   res.render('sign_up', { title: 'Sign Up',msg:'Username Already exist'});
}
next();
  });
}
router.get('/', function(req, res, next) {
  console.log(process.env);
  var loginUser=localStorage.getItem('LoginUserToken');
  if(loginUser){
    res.redirect('./dashboard');
  }
  else{
  res.render('index', { title: 'Login Khansamaa',msg:'' });
  console.log(res.json({data:userDetails}));
}
});
router.post('/', function(req, res, next) {
  var username=req.body.uname;
  var password=req.body.password;
  var loginas=req.body.loginas;
  var checkUser=userModule.findOne({username:username});
   checkUser.exec((err,data)=>{
  if(err) throw err;
  var getPassword=data.password;
  var getUserID=data._id;
  var getLoginstatus=data.signup_as;

  if(bcrypt.compareSync(password,getPassword)&& getLoginstatus==loginas){
    var token = jwt.sign({ userID: getUserID }, 'LoginToken');
    localStorage.setItem('userToken', token);
    localStorage.setItem('LoginUserToken', username);
    res.redirect('/dashboard');
  }
  else{
    res.render('login', { title: 'Login Page Khansamaa',msg:'Invalid Username or password' });
  }
  
});
  
});
router.get('/signup', function(req, res, next) {
  var loginUser=localStorage.getItem('LoginUserToken');
  if(loginUser){
    res.redirect('./dashboard');
  }
  else{
  res.render('sign_up', { title: 'Sign Up',msg:''});
}
});

router.post('/signup',checkUsername,checkEmail, function(req, res, next) {
  var username=req.body.uname;
  var email=req.body.email;
  var password=req.body.password;
  var confpassword=req.body.confpassword;
  if(confpassword!=password){
    res.render('sign_up', { title: 'Sign Up',msg:'Password did not matched'});
  }
  else{
    password=bcrypt.hashSync(req.body.password,10)
  var userDetails=new userModule({
    username:username,
    email:email,
    password:password,
  });
  userDetails.save((err,doc)=>{
if(err)throw err;
res.render('sign_up', { title: 'Sign Up',msg:'User registered successfully'});
  });
}
 
});



/*router.get('/view-password',checkLoginUser ,function(req, res, next) {
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
router.get('/view-password/:page',checkLoginUser ,function(req, res, next) {
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
});*/

router.get('/logout', function(req, res, next) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('LoginUserToken');
  
  res.redirect('/');
});
   module.exports = router;
