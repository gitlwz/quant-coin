
import { GET, POST } from '../utils/request';
import api from '../services/api.js';
export default {
    namespace: 'recentTrade',

    state: {
        dataSource: [],
        depthData: [],
    },

    effects: {
        *getTrade({ payload }, { call, put }) {
            const data = yield call(GET, api.trade.getTrade, { symbol: 'XBTUSD', count: '100', reverse: true });

            yield put({
                type: "save",
                payload: {
                    dataSource: data
                }
            })
        },
        *getDepth({ payload }, { call, put }) {
            const data = yield call(GET, api.depthchart.getDepth, { symbol: 'XBTUSD', depth: 50});

            yield put({
                type: "save",
                payload: {
                    depthData: data
                }
            })
        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload
            };
        }
    },

    subscriptions: {

    },
};
