var mysql = require('mysql');
var dbconfig = require("../config/database");
var pool = mysql.createPool(dbconfig.mysql);


exports.showUser = function(callback) {
    pool.getConnection(function(err, connection) {
        var sql = "SELECT * FROM user";
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


exports.InsertUser = function(user_name,user_phone,user_password,user_age,user_city,callback) {
    var  addSql = 'INSERT INTO user(user_name,user_phone,user_password,user_age,user_city) VALUES(?,?,?,?,?)';
    var  addSqlParams = [user_name,user_phone,user_password,user_age,user_city];
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

exports.ChangeUser = function(user_id, user_name, user_phone, user_password, user_age, user_city, callback) {
    console.log(user_id+" " +user_name+" " +user_phone+ " " +user_password, user_age, user_city+"ChangeNew=ChangeNew=CzhangeNew");
    var  updateSql = 'UPDATE user SET user_name=?, user_phone=?, user_password=?, user_age=?, user_city=? WHERE user_id='+user_id;
    var updateParams = [user_name, user_phone, user_password, user_age, user_city];
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

exports.deleteUser = function(user_id, callback) {
    pool.getConnection(function(err, connection) {
        // console.log(user_id);
        var sql = "DELETE FROM user WHERE user_id=" + user_id;
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

exports.findUserName = function(user_id,callback) {
    var sql = "SELECT user_name FROM user WHERE user_id = "+user_id;
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