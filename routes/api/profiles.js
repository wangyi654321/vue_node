const express = require('express');
const router = express.Router();
const passport = require("passport");

//引入User模型
const Profile = require("../../models/Profile");

//$route post api/profiles/add
//@desc 添加数据  passport.authenticate("jwt",{session:false})验证token
//@access private
router.post('/add', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const profileAll = {};
    if (req.body.type) profileAll.type = req.body.type;
    if (req.body.describe) profileAll.describe = req.body.describe;
    if (req.body.income) profileAll.income = req.body.income;
    if (req.body.expend) profileAll.expend = req.body.expend;
    if (req.body.cash) profileAll.cash = req.body.cash;
    if (req.body.remark) profileAll.remark = req.body.remark;
    new Profile(profileAll).save().then(profile => {
        res.json(profile)
    })
})

//$route get api/profiles/
//@desc 查询数据所有数据  passport.authenticate("jwt",{session:false})验证token
//@access private
router.get("/",(req, res) => {
    Profile.find().then(profile => {
        if(!profile){
            return res.status(404).json({"msg":"没有数据"})
        }
        res.json(profile)
    }).catch(err => {
        res.status(404).json(err)
    })
})

//$route get api/profiles/:id
//@desc 根据id查询数据  passport.authenticate("jwt",{session:false})验证token
//@access private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({ _id: req.params.id }).then(profile=>{
        if(!profile){
            return res.status(404).json({"msg":"没有找到数据"})
        }
        res.json(profile)
    }).catch(err=>{
        res.status(404).json(err)
    })
})

// @route  POST api/profiles/edit
// @desc   编辑信息接口
// @access Private
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    Profile.findOneAndUpdate(
       { _id:req.params.id},
       {$set:profileFields},
       {new:true}
    ).then(profile => res.json(profile))
    .catch(err => res.json(err));
})

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOneAndDelete({_id:req.params.id}).then(profile=>{
        profile.save().then(profile => res.json(profile))
    }).catch(err=>{
        res.status(404).json({"msg":"删除失败"})
    })
})
  
module.exports = router