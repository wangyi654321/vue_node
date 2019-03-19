import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Nofind from './views/404'
import Login from './views/user/Login'
import Register from './views/user/Register'
import Home from './views/Home'
import FoundList from './views/FoundList'
import InfoShow from './views/InfoShow'

Vue.use(Router)

const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '*',
      component: Nofind
    }, {
      path: '/',
      redirect: '/index'
    }, {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/index', component: Home },
        { path: '/index/home', name: 'home', component: Home },
        { path: '/index/foundlist', name: 'foundlist', component: FoundList },
        { path: '/index/infoshow', name: 'infoShow', component: InfoShow}
      ]
    }
  ]
});
//添加路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'||to.path=='/register'){
    next();
  }else{
    //通过eleToken判断是否登录
    const isLogin=localStorage.getItem("eleToken")? true: false
    if(isLogin){
      next()
    }else{
      next("/login")
    }
  }
})
export default  router