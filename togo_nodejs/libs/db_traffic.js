var mysql = require('mysql');
var dbconfig = require("../config/database");
var pool = mysql.createPool(dbconfig.mysql);


exports.showTraffic = function(callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "SELECT * FROM t_traffic";
        connection.query(sql,function(err,result) {
            if (err) { 
                throw err; 
            } 
            result = JSON.stringify(result);
            callback(err,result);
            connection.release();
        })
    });
};


exports.InsertTraffic = function(type,company,money,start_position,end_positon,start_time,end_time,callback) {
    var daaF = getDateByTimeStr(start_time);
    var daaE = getDateByTimeStr(end_time);
    var  addSql = 'INSERT INTO t_traffic(type,company,money,start_position,end_position,start_time,end_time) VALUES(?,?,?,?,?,?,?)';
    var  addSqlParams = [type, company, money, start_position,end_positon, daaF, daaE];
    pool.getConnection(function(err, connection) {
        //定义查询语句
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

exports.ChangeTraffic = function(traffic_id, type, company, money, start_position,end_position, start_time,end_time, callback) {
    var daaF = getDateByTimeStr(start_time);
    var daaE = getDateByTimeStr(end_time);
    console.log(type,company,money,start_position+ " " +daaE+"ChangeNew=ChangeNew=CzhangeNew");
    var updateSql = 'UPDATE t_traffic SET  company=?, money=?, start_position=?,end_position=?,  start_time=? ,end_time=? WHERE traffic_id=?';
    console.log(updateSql);
    var updateParams = [company, money, start_position,end_position, daaF, daaE,traffic_id];
    // var updateParams = [type];
    pool.getConnection(function(err, connection) {
        //定义查询语句
        connection.query(updateSql, updateParams, function(err,result) {
            //result = JSON.stringify(result);
            console.log('ChangeTraffic+ChangeTraffic+ChangeTraffic');
            if (err) { 
                throw err; 
            } 
            console.log(result);
            callback(err, JSON.stringify(result));
            connection.release();
        })
    });
   
};

exports.deleteTraffic = function(traffic_id, callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "DELETE FROM t_traffic WHERE traffic_id=" + traffic_id;
        connection.query(sql,function(err,result) {
            result = JSON.stringify(result);
            if (err) { 
                throw err; 
            } 
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

function getDateByTimeStr(timeStr) {
    var timeArr = timeStr.split(" ");
    var d = timeArr[0].split("-");
    var t = timeArr[1].split(":");
    return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
}
