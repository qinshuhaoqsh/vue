
var express = require("express");

var router = express.Router()

const {conn} = require("./db");

const async = require("async");
var waterfall = async.waterfall;
//阿里云短信模块
const SMSClient = require('@alicloud/sms-sdk');

var dateForMate =  function(date){
  var time = new Date(date);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day =  time.getDate();

  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

router.get("/allbook",(req,res)=>{
  var data = req.query;
  var page = data.page*1;
  var pagesize =data.pageSize*1;
  var limit = (page-1)*pagesize;
  conn((err,db)=>{
    if(err) throw err;
    db.collection("book").find().skip(limit).limit(pagesize).toArray((err,result)=>{
        if(err) throw err;
        res.json(result);
    })
  })
});

router.get("/books",(req,res)=>{
  var data = req.query;
  var page = data.page*1;
  var pagesize =data.pageSize*1;
  var moduleId=data.moduleId;
  var limit = (page-1)*pagesize;
  conn((err,db)=>{
    if(err) throw err;
    db.collection("book").find({moduleId}).skip(limit).limit(pagesize).toArray((err,result)=>{
        if(err) throw err;
        res.json(result);
    })
  })
});

router.get("/countpage",(req,res)=>{
  var data = req.query;
  var pagesize =data.pageSize;
  conn((err,db)=>{
    if(err) throw err;
    db.collection("book").find().count((err,result)=>{
      if(err) throw err;
      result=parseInt(result/pagesize)+1;
      res.json(result);
    })
  })
});

router.get("/countpages",(req,res)=>{
  var data = req.query;
  var pagesize =data.pageSize;
  var moduleId=data.moduleId;
  conn((err,db)=>{
    if(err) throw err;
    db.collection("book").find({moduleId}).count((err,result)=>{
      if(err) throw err;
      result=parseInt(result/pagesize)+1;
      res.json(result);
    })
  })
});

router.get("/detail",(req,res)=>{
  const dataId= req.query.dataId+'';
  conn((err,db)=>{
      if(err) throw err;
      db.collection("book").find({dataId}).toArray((err,result)=>{
          if(err) throw err;
          console.log(result);
          res.json(result);
      })
  })
});
//查看购物车数据
router.get("/shoppingcar",(req,res)=>{
  const username= req.query.username;
  conn((err,db)=>{
      if(err) throw err;
      db.collection("shoppingcar").aggregate([
        {
          $lookup:{
            from: "book",
            localField :"dataId",
            foreignField :"dataId",
            as:"books"
          }
        },
        {
          $match:{
            username
          }
        },
        { 
          $unwind: "$books" 
        }, 
        {
          $project: {
            username: 1,
            dataId: 1,
            num: 1,
            books: 1,
            check :1
        }
      }]).toArray((err,result)=>{
        if(err) throw err;
        res.json(result);
      })
  })
});

//总的商品数目
router.get("/shoppingcarcount",(req,res)=>{
  const username= req.query.username;
  conn((err,db)=>{
      if(err) throw err;
      db.collection("shoppingcar").aggregate([
        {
          $lookup:{
            from: "book",
            localField :"dataId",
            foreignField :"dataId",
            as:"books"
          }
        },
        {
          $match:{
            username
          }
        },
        { 
          $unwind: "$books" 
        }, 
        {
          $project: {
            username: 1
        }
      }]).toArray((err,result)=>{
        if(err) throw err;
        res.json(result.length);
      })
  })
});

//加入购物车
router.get("/create",(req,res)=>{
  var body = req.query;
  body.num= req.query.num*1;
  body.check=false;
  conn((err,db)=>{
    var users = db.collection("shoppingcar");
    waterfall([
      (cb)=>{
        users.findOne({username:body.username,dataId:body.dataId},(err,result)=>{
          if(err) cb(err,null);
          else{
            if(result) cb(null,true) //表示数据存在
            else cb(null,false) //不存在数据
          }
        })
      },
      (args,cb)=>{
        if(!args){
          // insert
          body.insertTime = new Date();
          users.insert(body,(err,result)=>{
            if(err) cb(err,null);
            else{
              cb(null,{
                type:1,
                code:200,
                result:"加入购物车成功!!!"
              });
            }
          })
        }else{
          body.insertTime = new Date();
          users.update({username:body.username,dataId:body.dataId},{$inc:{num:body.num}},(err,result)=>{
            if(err) cb(err,null);
            else{
              cb(null,{
                type:2,
                code:200,
                result:"加入购物车成功!!!"
              });
            }
          })
        }
      }
    ],(err,result)=>{
      
      if(err) throw err; //封装数据库错误的输出
      else  res.json(result);
    })
  })
})
//更新购物车每件商品的数量
router.get("/updatenum",(req,res)=>{
  var body =req.query;
  body.num= req.query.num*1;
  conn((err,db)=>{
    if(err) throw err;
    db.collection("shoppingcar").update({username:body.username,dataId:body.dataId},{$set:{num:body.num}},(err,result)=>{
      if(err) throw err;
      else res.json({
        type:2,
        code:200,
        result:"加入购物车成功!!!"
      })
    })
  })
})

//删一个
router.get("/delone",(req,res)=>{
  var body = req.query;
  const username= req.query.username;
  conn((err,db)=>{
    if(err) throw err;
    var car = db.collection("shoppingcar");
    waterfall([
      (cb)=>{
        car.remove({username:body.username,dataId:body.dataId},(err,result)=>{
          if(err) cb(err,null);
          else{
            if(result) cb(null,true) //表示数据存在
            else cb(null,true) //不存在数据
          }
        })
      },
      (args,cb)=>{
        if(args){
          db.collection("shoppingcar").aggregate([
            {
              $lookup:{
                from: "book",
                localField :"dataId",
                foreignField :"dataId",
                as:"books"
              }
            },
            {
              $match:{
                username
              }
            },
            { 
              $unwind: "$books" 
            }, 
            {
              $project: {
                username: 1,
                dataId: 1,
                num: 1,
                books: 1,
                check :1
            }
          }]).toArray((err,result)=>{
            if(err) throw err;
            else{cb(null,result);
            }
          })
        }
      }
    ],(err,result)=>{
      if(err) throw(err); //封装数据库错误的输出
      else  res.json(result);
    })
  })
})

//搜索
router.get("/search",(req,res)=>{
  var data = req.query;
  var like = decodeURI(data.key);
  console.log(like);
  var page = data.page*1;
  var pagesize =data.pageSize*1;
  var limit = (page-1)*pagesize;
  conn((err,db)=>{
    db.collection("book").find({"itemName":{$regex:like, $options:'i'}},{}).skip(limit).limit(pagesize).toArray((err,result)=>{
      if(err) throw err;
      if(result) res.json(result);
      else res.json({});
    })
  })
})
//搜索的数量
router.get("/searchs",(req,res)=>{
  var data = req.query;
  var pagesize =data.pageSize;
  var like = decodeURI(data.key);
  conn((err,db)=>{
    if(err) throw err;
    db.collection("book").find({"itemName":{$regex:like, $options:'i'}}).count((err,result)=>{
      if(err) throw err;
      result=parseInt(result/pagesize)+1;
      res.json(result);
    })
  })
});
//批量删除
router.get("/del",(req,res)=>{
  var body = req.query;
  conn((err,db)=>{
    db.collection("shoppingcar").remove({username:body.username,dataId:body.dataId},(err,result)=>{
      if(err) throw(err);
      else res.json({
        type:1,
        code:200,
        result:"删除成功"
      });
    })
  })
})
//注册
router.get("/register",(req,res)=>{
  var obj = req.query;
  var body = {};
  body.username = obj.username;
  body.password = obj.password;
  body.starttime = dateForMate(new Date());
  conn((err,db)=>{
    var users = db.collection("userinfo");
    waterfall([
      (cb)=>{
        users.findOne({username:body.username},(err,result)=>{
          if(err) cb(err,null);
          else{
            if(result) cb(null,true) //表示数据存在
            else cb(null,false) //不存在数据
          }
        })
      },
      (args,cb)=>{
        if(!args){
          // insert
          body.insertTime = new Date();
          users.insert(body,(err,result)=>{
            if(err) cb(err,null);
            else{
              cb(null,{
                type:1,
                code:200,
                result:"注册成功!!!"
              });
            }
          })
        }else{
          //该用户名已经被注册
          cb(null,{
            type:0,
            code:200,
            result:"该用户名已经被注册"
          })
        }
      }
    ],(err,result)=>{
      if(err) throw(err); //封装数据库错误的输出
      else  res.json(result);
    })
  })
  //res.send("注册成功！")
})

//登陆
router.get("/login",(req,res)=>{
      const body = req.query;
      conn((err,db)=>{
        if(err) throw err;
        db.collection("userinfo").find({username:body.username,password:body.password}).toArray((err,result)=>{
            if(err) throw  err;
            if(result.length>0){
              // 登陆成功
              res.json({code:1,type:"登录成功"})
            }else{
              // 登陆失败
              res.json({code:0,type:"登录失败"})
            }
      })
})
})



//短信验证码
/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
router.post("/send",(req,res)=>{ 
        const tel = req.body.tel;
        const num = parseInt(Math.random()*8999+1000);     
        // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
        const accessKeyId = 'LTAIt8qYo8pjhCh6'
        const secretAccessKey = 'psijg8NQtADbSKSKRrnTEC055fh3y3'
        //初始化sms_client
        let smsClient = new SMSClient({accessKeyId, secretAccessKey})
        //发送短信
        smsClient.sendSMS({
            PhoneNumbers: tel,
            SignName: '高淮',
            TemplateCode: 'SMS_138035004',
            TemplateParam: `{"code":${num}}`
        }).then(function (data) {
            let {Code}=data
            if (Code === 'OK') {
                //处理返回参数
                console.log(data)
                //连接数据库存储用户信息
                var insertData = function(db,callback){
                  //  1. 判断是否已注册
                  //  2. 已经注册就更新code 没有注册就直接新增数据
                    var userinfo = db.collection("userinfo");
                        async.waterfall([
                          function(callback){
                            userinfo.find({username:tel}).toArray((err,result)=>{
                              if(err) throw  err;
                              console.log(result);
                              if(result.length>0){
                                // 已经注册
                                callback(null,true)
                              }else{
                                // 没有注册
                                callback(null,false)
                              }
                            })
                          },
                          function(arg,callback){
                            if(!arg){
                              userinfo.insert({username:tel,code:num},function(err,result){
                                if(err) throw  err;
                                console.log("----------------------------------");
                                console.log(result);
                                callback(null,"0")
                              })
                            }else{
                              //已经被注册更新code
                                userinfo.update({username:tel},{$set:{code:num}}),(err,result)=>{
                                    if(err) throw err; 
                                    console.log(result)         
                                }
                                callback(null,"1")  
                            }
                          }
                  
                        ],function(err,result){
                          if(err) throw  err;
                          console.log(result);
                          callback(result)
                        })
                    }
                    conn((err,db)=>{
                      if(err) {
                          res.send("数据库错误");
                          db.close()
                          throw err;
                        }else{
                          console.log("数据库连接成功!");
                          insertData(db,function(data){
                               if(data=="0"){
                                 console.log("注册成功")                     
                                  res.json({code:0,type:"success"})
                               }else{
                                 console.log("用户名已存在!")
                                 res.json({code:1,type:"success"})
                               }
                               db.close()
                          })
                        }
                       
                  })         
            }
        }, function (err) {
            console.log(err)
        })
})

module.exports = router;