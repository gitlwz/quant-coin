let basUrl = "/api/v1";
export default {
    basUrl: basUrl,
    //委托接口
    trade: {
        getTrade: basUrl + "/trade",
    },
    //合约接口
    instrument: {
        getInstrument: basUrl + "/instrument",
    },
    //深度图接口
    depthchart: {
        getDepth: basUrl + "/orderBook/L2",
    },
}
