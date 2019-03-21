<template>
   <div class="infoshow">
      <el-row type="flex" class="row-bg" justify="center">
         <el-col :span='8'>
            <div class="user">
                  <img class='avatar' :src="user.avatar" alt="">
            </div>
         </el-col>
         <el-col :span='16'>
            <div class="userinfo">
               <div class="user-item">
                  <i class="fa fa-user"></i>
                  <span>{{user.name}}</span>
               </div>
               <div class="user-item">
                  <i class="fa fa-cog"></i>
                  <span>{{user.identity=='employee'? '员工':'管理员'}}</span>
               </div>
               <div class="user-item">
                  <i style="font-size:22px">个性签名:</i>
                  <span>{{sign}}</span>
                  <br>
                  <i style="font-size:22px">签名时间:</i>
                  <span>{{signTime|formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
               </div>
            </div>
         </el-col>
      </el-row>
   </div>
</template>
<script>
export default {
   name:'infoshow',
   computed:{
      user(){
         return this.$store.getters.user
      },
      sign(){
         return this.$store.getters.sign
      },
      signTime(){
         return this.$store.getters.signTime
      }
   }
}
</script>
<style lang="scss" scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>


