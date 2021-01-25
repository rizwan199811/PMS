var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
let dataArray=[
  {
    name:'Rizwan',
    Age:12
  },
  {
    name:'Ahmed',
    Age:18
  },
  {
    name:'Siddiqui',
    Age:21
  },

]
res.json({
  data:dataArray
});
module.exports=router;
});

module.exports = router;
