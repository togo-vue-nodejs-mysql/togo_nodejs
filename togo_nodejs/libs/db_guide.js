var mysql = require('mysql');
var dbconfig = require("../config/database");
var pool = mysql.createPool(dbconfig.mysql);



exports.showGuide = function(callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        var sql = "SELECT * FROM t_guide";
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

// nickname,content,reply,image,hot,date,see

exports.InsertGuide = function(nickname,content,reply,image,hot,date,see,callback) {
    var daaF = getDateByTimeStr(date);
    var  addSql = 'INSERT INTO t_guide(`nickname`,content,reply,image,hot,date,see) VALUES(?,?,?,?,?,?,?)';
    var  addSqlParams = [nickname,content,reply,image,hot,daaF,see,];
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


exports.ChangeGuide = function(guide_id, nickname,content,reply,image,hot,date,see, callback) {
    var daaE = getDateByTimeStr(date);
    console.log(guide_id+" " +nickname,content,reply,image,hot,daaE,see+" ChangeNew=ChangeNew=CzhangeNew");
    var  updateSql = 'UPDATE t_guide SET nickname=?, content=?, reply=?, image=?, hot=?, date=?, see=?  WHERE guide_id='+guide_id;
    var updateParams = [nickname,content,reply,image,hot,daaE,see,guide_id];
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

exports.deleteGuide = function(guide_id, callback) {
    pool.getConnection(function(err, connection) {
      //定义查询语句
        // console.log(user_id);
        var sql = "DELETE FROM t_guide WHERE guide_id=" + guide_id;
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



exports.FindGuideType = function(guide_id,callback) {
    var sql = "SELECT type FROM t_guide WHERE guide_id = "+guide_id;
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

function getDateByTimeStr(timeStr) {
    var timeArr = timeStr.split(" ");
    var d = timeArr[0].split("-");
    var t = timeArr[1].split(":");
    return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
}


