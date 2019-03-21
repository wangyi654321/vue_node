import * as types from '../types'
import { set } from 'mongoose';

const sign = {
    state: {
        sign: '', // 是否认证
        signTime: '' // 存储用户信息
    },
    getters: {
        sign: state => state.sign,
        signTime: state => state.signTime
    },
    mutations: {
        [types.SET_SIGN](state, sign) {
            if (sign) {
                state.sign = sign
            } else {
                state.sign = '留下你的大名'
            }
        },
        [types.SET_SIGNTIME](state, time) {
            if (time) {
                state.signTime = time
            } else {
                state.signTime = new Date()
            }
        }
    },
    actions: {
        setSign:({commit},sign)=>{
            commit(types.SET_SIGN,sign)
        },
        setSignTime:({commit},time)=>{
            commit(types.SET_SIGNTIME,time)
        }
    }
}
export default sign;