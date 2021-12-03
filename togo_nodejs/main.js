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






//  对用户表操作 ====================== user表 ==============================
// 获取全部用户
app.get('/api/user/getAllUser',function(req, res){
    userdb.showUser(function(err, result){
        console.log("getAllUser-getAllUser-getAllUser-getAllUser");
        res.end(result);
    });
});


// 增加用户
app.post('/api/user/addUser', urlencodedParser ,function(req, res) {
    console.log(req.body);
    console.log(req.body.user_name+"--name--addUser-addUser-addUser-addUser");
    var user_name = req.body.user_name;
    var user_phone = req.body.user_phone;
    var user_password = req.body.user_password;
    var user_age = req.body.user_age;
    var user_city = req.body.user_city;
    // console.log(req);
    userdb.InsertUser(user_name,user_phone,user_password,user_age,user_city,function(err, result){
        res.end(result);
    });
});

// 根据id更改信息
app.post('/api/user/updateUserById', urlencodedParser ,function(req, res) {
    console.log(req.body.user_name+"--name---changeUserById-changeUserById-changeUserById");
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var user_phone = req.body.user_phone;
    var user_password = req.body.user_password;
    var user_age = req.body.user_age;
    var user_city = req.body.user_city;
    userdb.ChangeUser(user_id,user_name,user_phone,user_password,user_age,user_city,function(err, result){
        res.end(result);
    });
});

// 根据id删除user
app.post('/api/user/deleteById', urlencodedParser ,function(req, res) {
    console.log("--id--deleteById-deleteById-deleteById");
    console.log(req.body);
    var id = req.body.user_id;
    userdb.deleteUser(id,function(err, result){
        res.end(result);
    });
});

// 根据id获取user
app.get('/api/user/getUserById',function(req, res){
    var id = parseInt(req.query.user_id);
    console.log(id+"getUserById-getUserById-getUserById-getUserById");
    userdb.findUserName(id,function(err, result){
        res.end(result);
    });
});








//  对酒店表操作 ====================== hotel 表  ==============================
// 酒店获取全部酒店
app.get('/api/hotel/getAllHotel',function(req, res){
    hoteldb.showHotel(function(err, result){
        console.log("getAllHotel-getAllHotel-getAllHotel-getAllHotel");
        res.end(result);
    });
});



// 酒店增加酒店
app.post('/api/hotel/addHotel', urlencodedParser ,function(req, res) {
    console.log(req.body);
    console.log(req.body.name+"--name--addHotel-addHotel-addHotel-addHotel");
    var name = req.body.name;
    var phone = req.body.phone;
    var city = req.body.city;
    var address = req.body.address;
    var type = req.body.type;
    // console.log(req);
    hoteldb.InsertHotel(name,phone,city,address,type,function(err, result){
        res.end(result);
    });
});

// 酒店根据id更改信息
app.post('/api/hotel/updateHotelById', urlencodedParser ,function(req, res) {
    console.log(req.body.name+"--name---changeHotelById-changeHotelById-changeHotelById");
    var hotel_id = req.body.hotel_id;
    var name = req.body.name;
    var phone = req.body.phone;
    var city = req.body.city;
    var address = req.body.address;
    var type = req.body.type;
    hoteldb.ChangeHotel(hotel_id,name,phone,city,address,type,function(err, result){
        res.end(result);
    });
});


// 酒店根据id删除
app.post('/api/hotel/deleteById', urlencodedParser ,function(req, res) {
    console.log("--id--deleteById-deleteById-deleteById");
    console.log(req.body);
    var id = req.body.hotel_id;
    hoteldb.deleteNews(id,function(err, result){
        res.end(result);
    });
});


// 酒店根据id获取
app.get('/api/hotel/getHotelById',function(req, res){
    var id = parseInt(req.query.hotel_id);
    console.log(id+"getHotelById-getHotelById-getHotelById-getHotelById");
    hoteldb.FindHotelType(id,function(err, result){
        res.end(result);
    });
});




//  对行程表操作 ====================== treffic 表  ==============================
// 行程获取全部行程
app.get('/api/traffic/getAllTraffic',function(req, res){
    trafficdb.showTraffic(function(err, result){
        console.log("getAllTraffic-getAllTraffic-getAllTraffic-getAllTraffic");
        res.end(result);
    });
});



// 行程增加行程
app.post('/api/traffic/addTraffic', urlencodedParser ,function(req, res) {
    console.log(req.body);
    console.log(req.body.company+"--company--addTraffic-addTraffic-addTraffic-addTraffic");
    var type = req.body.type;
    var company = req.body.company;
    var money = req.body.money;
    var start_position = req.body.start_position;
    var end_position = req.body.end_position;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    // console.log(req);
    trafficdb.InsertTraffic(type,company,money,start_position,end_position,start_time, end_time,function(err, result){
        res.end(result);
    });
});

// 行程根据id更改信息
app.post('/api/traffic/updateTrafficById', urlencodedParser ,function(req, res) {
    console.log(req.body.company+"--company---changeTrafficById-changeTrafficById-changeTrafficById");
    var traffic_id = req.body.traffic_id;
    var type = req.body.type;
    var company = req.body.company;
    var money = req.body.money;
    var start_position = req.body.start_position;
    var end_position = req.body.end_position;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    console.log(traffic_id);
    console.log("updateTrafficById-updateTrafficById");
    trafficdb.ChangeTraffic(traffic_id,type,company,money,start_position,end_position,start_time, end_time,function(err, result){
        res.end(result);
    });
});


// 行程根据id删除
app.post('/api/traffic/deleteById', urlencodedParser ,function(req, res) {
    console.log("--id--deleteById-deleteById-deleteById");
    console.log(req.body);
    var id = req.body.traffic_id;
    trafficdb.deleteTraffic(id,function(err, result){
        res.end(result);
    });
});



// 行程根据id获取
app.get('/api/traffic/getTrafficById',function(req, res){
    var id = parseInt(req.query.traffic_id);
    console.log(id+"getTrafficById-getTrafficById-getTrafficById-getTrafficById");
    trafficdb.findTrafficType(id,function(err, result){
        res.end(result);
    });
});










//  对room表操作 ====================== room表 ==============================
// 获取全部room
app.get('/api/room/getAllRoom',function(req, res){
    roomdb.showRoom(function(err, result){
        console.log("getAllRoom-getAllRoom-getAllRoom-getAllRoom");
        res.end(result);
    });
});


// 增加
app.post('/api/room/addRoom', urlencodedParser ,function(req, res) {
    console.log(req.body);
    console.log(req.body.type+" --name--addRoom-addRoom-addRoom-addRoom");
    var type= req.body.type;
    var money = req.body.money;
    var people= req.body.people;
    var count= req.body.count;
    // console.log(req);
    roomdb.InsertRoom(type,money,people,count,function(err, result){
        res.end(result);
    });
});

// 根据id更改信息
app.post('/api/room/updateRoomById', urlencodedParser ,function(req, res) {
    console.log(req.body.room_name+"--name---changeRoomById-changeRoomById-changeRoomById");
    var room_id = req.body.room_id;
    var type= req.body.type;
    var money = req.body.money;
    var people= req.body.people;
    var count= req.body.count;
    roomdb.ChangeRoom(room_id,type,money,people,count,function(err, result){
        res.end(result);
    });
});

// 根据id删除room
app.post('/api/room/deleteById', urlencodedParser ,function(req, res) {
    console.log("--id--deleteById-deleteById-deleteById");
    console.log(req.body);
    var id = req.body.room_id;
    roomdb.deleteRoom(id,function(err, result){
        res.end(result);
    });
});

// 根据id获取room
app.get('/api/room/getRoomById',function(req, res){
    var id = parseInt(req.query.room_id);
    console.log(id+"getRoomById-getRoomById-getRoomById-getRoomById");
    roomdb.findRoomMoney(id,function(err, result){
        res.end(result);
    });
});








//  对guide表操作 ====================== guide 表  ==============================
// 获取全部guide
app.get('/api/guide/getAllGuide',function(req, res){
    guidedb.showGuide(function(err, result){
        console.log("getAllGuide-getAllGuide-getAllGuide-getAllGuide");
        res.end(result);
    });
});



// guide增加
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

// guide根据id更改信息
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


// guide根据id删除
app.post('/api/guide/deleteById', urlencodedParser ,function(req, res) {
    console.log("--id--deleteById-deleteById-deleteById");
    console.log(req.body);
    var id = req.body.guide_id;
    guidedb.deleteGuide(id,function(err, result){
        res.end(result);
    });
});



// guide根据id获取
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
