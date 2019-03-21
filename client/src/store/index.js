import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import sign from './modules/userSign'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: [
        user,
        sign
    ]
})