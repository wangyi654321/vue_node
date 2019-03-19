const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser') // 处理post请求参数
const passport = require("passport");

//在入口文件中初始化passport
app.use(passport.initialize());

require('./config/passport')(passport);

//引入user.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles.js')

// DB config
const db = require('./config/keys').mongoURI;

const port = process.env.PORT || 3000;

//使用body-parse中间件
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect(db).then(() => {
    console.log("数据库链接成功")
}).catch(err => console.log(err))

//使用routers,登录，注册
app.use('/api/users', users);

//数据的增删改查
app.use('/api/profiles', profiles)

app.listen(port, () => {
    console.log(`runing port ${port}...`)
})