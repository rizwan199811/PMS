const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var dotenv = require('dotenv');
require('dotenv').config()
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true, useCreateIndex: true});
var conn =mongoose.Collection;
var passSchema =new mongoose.Schema({
    password_name: {type:String, 
        required: true,
        },
        project_name: {type:String, 
            required: true,
           },
        password_detail: {type:String, 
            required: true,
           },
    date:{
        type: Date, 
        default: Date.now }
});
passSchema.plugin(mongoosePaginate);
var passModel = mongoose.model('password_details', passSchema);
module.exports=passModel;