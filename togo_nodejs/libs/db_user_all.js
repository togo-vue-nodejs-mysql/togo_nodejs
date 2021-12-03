var mysql = require('mysql');
var dbconfig = require("../config/database");
var pool = mysql.createPool(dbconfig.mysql);


exports.showUser = function(callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "SELECT * FROM user";
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            // console.log(result);
            // 释放连接
            callback(err,result);
            connection.release();
        })
    });
};


exports.InsertUser = function(user_name,user_phone,user_password,user_age,user_city,callback) {
    var  addSql = 'INSERT INTO user(user_name,user_phone,user_password,user_age,user_city) VALUES(?,?,?,?,?)';
    var  addSqlParams = [user_name,user_phone,user_password,user_age,user_city];
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(addSql, addSqlParams, function(err,result) {
            //result = JSON.stringify(result);
            console.log(result);
            // 释放连接
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
        //定义查询语句
        connection.query(updateSql, updateParams, function(err,result) {
            //result = JSON.stringify(result);
            console.log('ChangeUser+ChangeUser+ChangeUser');
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
   
};

exports.deleteUser = function(user_id, callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        // console.log(user_id);
        var sql = "DELETE FROM user WHERE user_id=" + user_id;
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            console.log(result);
            // 释放连接
            callback(err,result);
            connection.release();
        })
    });
};

exports.findUserName = function(user_id,callback) {
    var sql = "SELECT user_name FROM user WHERE user_id = "+user_id;
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(sql, function(err,result) {
            //result = JSON.stringify(result);
            console.log("Detail=Detail=Detail=Detail");
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
};

















exports.showHotel = function(callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "SELECT * FROM t_hotel";
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            // console.log(result);
            // 释放连接
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
        //定义查询语句
        connection.query(addSql2, addSqlParams2, function(err,result) {
            //result = JSON.stringify(result);
            console.log(result);
            // 释放连接
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
        //定义查询语句
        connection.query(updateSql, updateParams, function(err,result) {
            console.log('query+query+query');
            //result = JSON.stringify(result);
            console.log(result);
            // 释放连接
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
            //result = JSON.stringify(result);
            console.log("Detail=Detail=Detail=Detail");
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
}












exports.showTraffic = function(callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "SELECT * FROM t_traffic";
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            // console.log(result);
            // 释放连接
            callback(err,result);
            connection.release();
        })
    });
};


exports.InsertTraffic = function(type,company,money,start_position,end_positon,start_time,end_time,callback) {
    var  addSql = 'INSERT INTO t_traffic(type,company,money,start_position,end_positon,start_time,end_time) VALUES(?,?,?,?,?,?,?)';
    var  addSqlParams = [type,company,money,start_position,end_positon,start_time,end_time];
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(addSql, addSqlParams, function(err,result) {
            //result = JSON.stringify(result);
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
};

exports.ChangeTraffic = function(traffic_id, type, company, money, start_position,end_positon, start_time,end_time, callback) {
    console.log(traffic_id+" " +type+" " +company+ " " +money, start_position,end_positon, start_time,end_time+"ChangeNew=ChangeNew=CzhangeNew");
    var updateSql = 'UPDATE t_traffic SET type=?, company=?, money=?, start_position=? ,end_positon=?, start_time=? ,end_time=? WHERE traffic_id='+traffic_id;
    var updateParams = [type, company, money, start_position,end_positon, start_time,end_time];
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(updateSql, updateParams, function(err,result) {
            //result = JSON.stringify(result);
            console.log('ChangeTraffic+ChangeTraffic+ChangeTraffic');
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
   
};

exports.deleteTraffic = function(traffic_id, callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        // console.log(traffic_id);
        var sql = "DELETE FROM t_traffic WHERE traffic_id=" + traffic_id;
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            console.log(result);
            // 释放连接
            callback(err,result);
            connection.release();
        })
    });
};

exports.findTrafficType = function(traffic_id,callback) {
    var sql = "SELECT type FROM t_traffic WHERE traffic_id = "+traffic_id;
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(sql, function(err,result) {
            //result = JSON.stringify(result);
            console.log("Detail=Detail=Detail=Detail");
            console.log(result);
            // 释放连接
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
};











