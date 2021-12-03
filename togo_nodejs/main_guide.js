var express = require('express');
var app = express();

var userdb = require('./libs/db_user');
var hoteldb = require('./libs/db_hotel');
var trafficdb = require('./libs/db_traffic');
var roomdb = require('./libs/db_room');
var guidedb = require('./libs/db_guide');

var bodyParser = require('body-parser');


//  解决跨域问题
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS') {
        /*让options请求快速返回*/
       res.sendStatus(200)
   } else {
       next()
   }
})

//创建application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });







//  对行程表操作 ====================== guide 表  ==============================
// 行程获取全部行程
app.get('/api/guide/getAllGuide',function(req, res){
    guidedb.showGuide(function(err, result){
        console.log("getAllGuide-getAllGuide-getAllGuide-getAllGuide");
        res.end(result);
    });
});



// 行程增加行程
app.post('/api/guide/addGuide', urlencodedParser ,function(req, res) {
    console.log(req.body);
    console.log(req.body.company+"--company--addGuide-addGuide-addGuide-addGuide");
    var nickname = req.body.nickname;
    var reply = req.body.reply;
    var image = req.body.image;
    var hot = req.body.hot;
    var date = req.body.date;
    var see = req.body.see;
    var content = req.body.content;
    // console.log(req);
    guidedb.InsertGuide(nickname,content,reply,image,hot,date,see,function(err, result){
        res.end(result);
    });
});

// 行程根据id更改信息
app.post('/api/guide/updateGuideById', urlencodedParser ,function(req, res) {
    console.log(req.body.company+"--company---changeGuideById-changeGuideById-changeGuideById");
    var guide_id = req.body.guide_id;
    var nickname = req.body.nickname;
    var reply = req.body.reply;
    var image = req.body.image;
    var hot = req.body.hot;
    var date = req.body.date;
    var see = req.body.see;
    var content = req.body.content;
    console.log(guide_id);
    console.log("updateGuideById-updateGuideById");
    guidedb.ChangeGuide(guide_id,nickname,content,reply,image,hot,date,see,function(err, result){
        res.end(result);
    });
});


// 行程根据id删除
app.post('/api/guide/deleteById', urlencodedParser ,function(req, res) {
    console.log("--id--deleteById-deleteById-deleteById");
    console.log(req.body);
    var id = req.body.guide_id;
    guidedb.deleteGuide(id,function(err, result){
        res.end(result);
    });
});



// 行程根据id获取
app.get('/api/guide/getGuideById',function(req, res){
    var id = parseInt(req.query.guide_id);
    console.log(id+"getGuideById-getGuideById-getGuideById-getGuideById");
    guidedb.findGuideType(id,function(err, result){
        res.end(result);
    });
});

















var server = app.listen(8989,function(){
    var host = server.address().address;  //服务器地址
    var port = server.address().port;      //服务器端口号
    console.log("应用实例，访问地址：http://%s:%s",host, port);
});
