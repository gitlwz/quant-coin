
import { GET, POST } from '../utils/request';
import api from '../services/api.js';
import { arrayOfDeffered } from 'redux-saga/utils';
export default {
    namespace: 'recentTrade',

    state: {
        dataSource: [],
        sellData: [],
        buyData: []
    },

    effects: {
        *getTrade({ payload }, { call, put }) {
            const data = yield call(GET, api.trade.getTrade, { symbol: 'XBTUSD', count: '100', reverse: true });
            data.forEach((ele,index,arr) => {
                if(index < arr.length -1){
                    if(ele.price > arr[index+1].price){
                        ele.icon = "arrow-up"
                    }else if(ele.price < arr[index+1].price){
                        ele.icon = "arrow-down"
                    }else{
                        ele.icon = ""
                    }
                }
            });
            yield put({
                type: "saveTrade",
                payload: {
                    dataSource: data
                }
            })
        },

    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload
            };
        },
        saveTrade(state, { payload }) {
            let newDataSource = payload.dataSource
            let oldDataSource = [...state.dataSource];
            oldDataSource.push(...newDataSource)
            return {
                ...state, dataSource: oldDataSource
            };
        },
        insert(state, { payload }) {
            let { dataSource } = payload
            let last = dataSource[dataSource.length -1];
            let oldDataSource = [...state.dataSource]
            let prv = oldDataSource.length>0?oldDataSource[0]:null;
            dataSource.forEach((ele)=>{
                ele.anite = "light"
            })
            if(!!prv){
                if(last.price > prv.price){
                    last.icon = "arrow-up"
                }else if(last.price < prv.price){
                    last.icon = "arrow-down"
                }else{
                    last.icon = ""
                }
            }

            oldDataSource.unshift(...dataSource);
            if (oldDataSource.length > 100) {
                oldDataSource.length = 100;
            }
            return {
                ...state, dataSource: oldDataSource
            };
        },
        partial(state, { payload }) {
            let { depthData } = payload;
            let sellData = [];
            let buyData = [];
            let leftAll = 0;
            let rightAll = 0;
            let length = depthData.length / 2
            for (let i = 0; i < length; i++) {
                let right = depthData[length - 1 - i];
                let left = depthData[length + i];

                rightAll += right.size;
                right.all = rightAll;
                sellData.unshift(right);

                leftAll += left.size;
                left.all = leftAll;
                buyData.push(left)
            }
            return {
                ...state, buyData, sellData
            };
        },
        update(state, { payload }) {
            let { sellData, buyData } = state;
            const { updataData } = payload;
            let _sellData = [];
            let _buyData = [];
            let leftAll = 0;
            let rightAll = 0;
            let length = sellData.length;
            for (let i = 0; i < length; i++) {
                let left = buyData[i];
                let right = sellData[length - 1 - i];
                let leftUpData = updataData.find((ele) => ele.id == left.id);
                let rightUpData = updataData.find((ele) => ele.id == right.id);
                if (!!leftUpData) {
                    let dic = ""
                    if (left.size > leftUpData.size) {
                        dic = "up"
                    }
                    if (left.size < leftUpData.size) {
                        dic = "down"
                    }
                    left = { ...left, ...leftUpData }
                    left.dic = dic;
                }else{
                    left.dic = "";
                }
                if (!!rightUpData) {
                    let dic = ""
                    if (right.size > rightUpData.size) {
                        dic = "up"
                    }
                    if (right.size < rightUpData.size) {
                        dic = "down"
                    }
                    right = { ...right, ...rightUpData }
                    right.dic = dic;
                }else{
                    right.dic = "";
                }

                leftAll += left.size;
                left.all = leftAll;
                _buyData.push(left);

                rightAll += right.size;
                right.all = rightAll;
                _sellData.unshift(right)
            }
            return {
                ...state, buyData: _buyData, sellData: _sellData
            };
        }
    },

    subscriptions: {

    },
};
