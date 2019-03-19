// login and register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var keys=require('../../config/keys');
var gravatar = require('gravatar');

//引入passport中间件
const passport = require("passport");     

//引入User模型
const User = require("../../models/User");

//$route post api/users/register
//@desc 返回请求的json数据
//@access public
router.post('/register', (req, res) => {
    //查询数据库中是否有邮箱
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                email: '邮箱已被注册'
            })
        } else {
            //使用全球公认头像
            const url = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: url,
                password: req.body.password,
                identity:req.body.identity
            })
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    }).catch(err => console.log(err))
})

//$route post api/users/login
//@desc 返回token jwt passport
//@access public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({
        email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                "msg": "用户不存在"
            })
        }
        //匹配密码 1/前端传过来的密码。2/数据库密码
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const rule={
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    avatar:user.avatar,
                    identity:user.identity
                };
                //jwt.sign("规则","加密名字","过期时间","箭头函数")
                jwt.sign(rule,keys.secretOrKey,{expiresIn:36000},(err,token)=>{
                    if(err) throw err
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                res.status(404).json({
                    "msg": "密码错误，请重新登录"
                })
            }
        });
    }).catch(err => {
        console.log(err)
    })
})

//$route GET api/users/current
//@desc return current user
//验证token得到用户信息
//使用passport-jwt验证token
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        avatar:req.user.avatar,
        identity:req.user.identity
    }); 
})


module.exports = router;