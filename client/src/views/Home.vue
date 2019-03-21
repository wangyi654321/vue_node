<template>
    <div class="home">
        <div class="container">
            <h1 class="title">及时关注各项数据</h1>
            <p class="lead"> 专注于数据分析, 用心做分析, 用心做服务! </p>
            <el-input v-model="input" style="width: 15%" placeholder="请输入个性签名展示在个人信息页面"></el-input>
            <el-button type="primary" round @click="btnSign">主要按钮</el-button>
        </div>
    </div>
</template>
<script>
export default {
  name:'home',
  data() {
    return {
      input: ''
    }
  },
  methods:{
    btnSign(){
      this.$store.dispatch("setSign",this.input)
      this.$store.dispatch("setSignTime",new Date())
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: white;
    .title {
      font-size: 30px;
    }
    .lead {
      margin-top: 50px;
      font-size: 22px;
    }
  }
}
</style>