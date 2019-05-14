

var express = require("express");
var fs = require("fs");

const app = express();  // 包装好 http 

const host = "0.0.0.0";   // 阿里云的内网IP

const port = 5000;

const {conn} = require("./db");

var vue = require("./vue");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

app.use(bodyParser.json());  // ajax  post  请求  $.ajax(url,postData,{params} )
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded  表单提交的数据 给后台 
app.use(cookieParser());  //  设置 cookies 中间件 

// 处理跨域方法 jsonp
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});


app.use("/vue",vue);  // 设置路由中间键 



app.listen(port,host,()=>{
    console.log(`ECS server  is running at http://${host}:${port}`);
})