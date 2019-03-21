import * as types from '../types'

const user = {
    state: {
        isAutnenticated: false, // 是否认证
        user: {} // 存储用户信息
    },
    getters: {
        isAutnenticated: state => state.isAutnenticated,
        user: state => state.user
    },
    mutations: {
        [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
            if (isAutnenticated) {
                state.isAutnenticated = isAutnenticated
            } else {
                state.isAutnenticated = false
            }
        },
        [types.SET_USER](state, user) {
            if (user) {
                state.user = user
            } else {
                state.user = {}
            }
        }
    },
    actions: {
        setIsAutnenticated:({commit},isAutnenticated)=>{
            commit(types.SET_IS_AUTNENTIATED,isAutnenticated)
        },
        setUser:({commit},user)=>{
            commit(types.SET_USER,user)
        },
        clearCurrentState:({commit})=>{
            commit(types.SET_IS_AUTNENTIATED,false),
            commit(types.SET_USER,null)
        }
    }
}
export default user;