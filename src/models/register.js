/*
 * @Author: 刘文柱 
 * @Date: 2018-11-15 17:02:01 
 * @Last Modified by: 刘文柱
 * @Last Modified time: 2018-11-15 17:24:21
 */
import { routerRedux } from 'dva/router';
export default {
    namespace: 'register',

    state: {
    },

    effects: {
        *submit({ payload }, { call, put }) {
            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                })
            );
        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    },
};
