


// mongodb 连接数据库模块 

var mongodb = require("mongodb");

var {MongoClient} = require("mongodb");

// var CONN_DB_STR = "mongodb://116.62.70.96:27017/yys";  // 公网IP 

exports.conn=(callback)=>{
    var CONN_DB_STR="mongodb://localhost:27017/kongfuzi";
    MongoClient.connect(CONN_DB_STR,(err,db)=>{
        if(err){
            callback(err,null);
            throw err;
        }else{
            console.log("数据库连接成功");
            callback(null,db);
        }
    })
}

// module.exports = {
//     conn:function(callback){
//         MongoClient.connect(CONN_DB_STR,(err,db)=>{
//             if(err){
//                 callback(err,null);
//             }else{
//                 callback(null,db);
//             }
//         })
//     }
// }

