var mysql = require('mysql');
var dbconfig = require("../config/database");
var pool = mysql.createPool(dbconfig.mysql);


exports.showRoom = function(callback) {
    pool.getConnection(function(err, connection) {
        var sql = "SELECT * FROM t_room";
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            if (err) { 
                throw err; 
            } 
            callback(err,result);
            connection.release();
        }) 
    });
};

// room_id,type,money,people,count

exports.InsertRoom = function(type,money,people,count,callback) {
    var  addSql = 'INSERT INTO t_room(type,money,people,count) VALUES(?,?,?,?)';
    var  addSqlParams = [type,money,people,count];
    pool.getConnection(function(err, connection) {
        connection.query(addSql, addSqlParams, function(err,result) {
            if (err) { 
                throw err; 
            } 
            console.log(result);
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
};

exports.ChangeRoom = function(room_id,type,money,people,count, callback) {
    console.log(room_id,type,money,people,count+"ChangeNew=ChangeNew=CzhangeNew");
    var  updateSql = 'UPDATE t_room SET type=?,money=?,people=?,count=? WHERE room_id=?';
    var updateParams = [type,money,people,count,room_id];
    pool.getConnection(function(err, connection) {
        connection.query(updateSql, updateParams, function(err,result) {
            if (err) { 
                throw err; 
            } 
            console.log('ChangeUser+ChangeUser+ChangeUser');
            console.log(result);
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
   
};

exports.deleteRoom = function(room_id, callback) {
    pool.getConnection(function(err, connection) {
        // console.log(user_id);
        var sql = "DELETE FROM t_room WHERE room_id=" + room_id;
        connection.query(sql,function(err,result) {
            if (err) { 
                throw err; 
            } 
            result = JSON.stringify(result);
            console.log(result);
            callback(err,result);
            connection.release();
        })
    });
};

exports.findRoomMoney = function(room_id,callback) {
    var sql = "SELECT money FROM t_room WHERE room_id = "+room_id;
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err,result) {
            if (err) { 
                throw err; 
            } 
            console.log("Detail=Detail=Detail=Detail");
            console.log(result);
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
};