import { routerRedux } from 'dva/router';
import { setAuthority,setUserUserlogin,removeUserUserlogin } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
let remember = !window.localStorage.getItem("qdp-remember")? true:JSON.parse(window.localStorage.getItem("qdp-remember"))
export default {
    namespace: 'login',
    state: {
        remember:remember
    },

    effects: {
        *login({ payload }, { call, put ,select}) {
            const response = {
                status: 'ok',
                currentAuthority: 'admin',
            };
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            if (response.status === 'ok') {
                let remember = yield select(({login}) => login.remember)
                if(!!remember){
                    setUserUserlogin(payload)
                }else{
                    removeUserUserlogin();
                }
                reloadAuthorized();
                //登陆成功跳转到首页
                const urlParams = new URL(window.location.href);
                window.location.href = urlParams.origin + urlParams.pathname;
            }
        },
        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    currentAuthority: 'guest',
                },
            });
            reloadAuthorized();
            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                })
            );
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                type: payload.type,
            };
        },
        changeCheckbox(state, { payload }){
            window.localStorage.setItem("qdp-remember",JSON.stringify(payload.remember))
            return {
                ...state,
                ...payload
            };
        }
    },
};
