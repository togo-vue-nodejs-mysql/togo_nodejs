var mysql = require('mysql');
var dbconfig = require("../config/database");
var pool = mysql.createPool(dbconfig.mysql);



exports.showHotel = function(callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "SELECT * FROM t_hotel";
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            if (err) { 
                throw err; 
            } 
            callback(err,result);
            connection.release();
        })
    });
}



exports.InsertHotel = function(name,phone,city,address,type,callback) {
    var  addSql2 = 'INSERT INTO t_hotel(name,phone,city,address,type) VALUES(?,?,?,?,?)';
    var  addSqlParams2 = [name,phone,city,address,type];
    console.log(addSqlParams2);
    pool.getConnection(function(err, connection) {
        connection.query(addSql2, addSqlParams2, function(err,result) {
            if (err) { 
                throw err; 
            } 
            console.log(result);
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
}

exports.ChangeHotel = function(hotel_id, name, phone, city, address, type, callback) {
    console.log(hotel_id+" " +name+" " +phone+ " " +city+ " " +address+ " " +type+" ChangeNew=ChangeNew=CzhangeNew");
    var  updateSql = 'UPDATE t_hotel SET name=?, phone=?, city=?, address=?, type=? WHERE hotel_id='+hotel_id;
    var updateParams = [name, phone, city, address, type];
    pool.getConnection(function(err, connection) {
       
        connection.query(updateSql, updateParams, function(err,result) {
            if (err) { 
                throw err; 
            } 
            console.log('query+query+query');
            console.log(result);
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
}

exports.deleteNews = function(hotel_id, callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        // console.log(user_id);
        var sql = "DELETE FROM t_hotel WHERE hotel_id=" + hotel_id;
        connection.query(sql,function(err,result) {
            if (err) { 
                throw err; 
            } 
            result = JSON.stringify(result);
            console.log(result);
            // 释放连接
            callback(err,result);
            connection.release();
        })
    });
}



exports.FindHotelType = function(hotel_id,callback) {
    var sql = "SELECT type FROM t_hotel WHERE hotel_id = "+hotel_id;
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(sql, function(err,result) {
            if (err) { 
                throw err; 
            } 
            console.log("Detail=Detail=Detail=Detail");
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
}