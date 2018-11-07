
import { GET, POST } from '../utils/request';
import api from '../services/api.js';
export default {
    namespace: 'instrument',

    state: {
        dataSource: [],
        instrumentData: {}
    },

    effects: {
        *getInstrument({ payload }, { call, put }) {
            const data = yield call(GET, api.instrument.getInstrument, {});
            let instrumentMap = {};
            if(!!data){
                for(let value of data){
                    if(!!instrumentMap[value.rootSymbol]){
                        instrumentMap[value.rootSymbol].push(value);
                    }else{
                        instrumentMap[value.rootSymbol] = [];
                        instrumentMap[value.rootSymbol].push(value);
                    }
                }
            }
            yield put({
                type: "save",
                payload: {
                    dataSource: instrumentMap
                }
            })
        },
        *getInstrumentBySymbol({ payload }, { call, put }) {
            const instrumentData = yield call(GET, api.instrument.getInstrument, {...payload});
            yield put({
                type: "save",
                payload: {
                    instrumentData
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
