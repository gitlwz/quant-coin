import React, { Component } from 'react'
import { GridContent, webSocket } from "quant-ui";
import TotalRight from "./totalRight";
import InstrumentMarket from "./instrumentMarket";
import InstrumentDetal from "./instrumentDetal";
import RecentTrade from "./recentTrade";
import OrderList from "./orderList";
import Kline from "./kline";
import Depthchart from "./depthchart";
import UserOrder from "./userOrder";
import Perpetual from "./perpetual";
import PositionHold from "./positionHold";
import OrderCommit from "./orderCommit";
import { connect } from 'dva';
class Index extends Component {
    constructor(props) {
        super(props);
        this.ws = null;
    }
    componentWillMount = () => {
        const { dispatch } = this.props;
        this.ws = new webSocket("wss://www.bitmex.com/realtime", null, { breatheParams: "ping" });
        this.ws.onopen = (evt) => {
            this.ws.send(JSON.stringify({ op: "subscribe", args: [
                "orderBookL2_25:XBTUSD","trade:XBTUSD",
                "instrument:XBTUSD"] }));
        };
        this.ws.onmessage = ({data}) => {
            
            if (data !== "pong") {
                let res = JSON.parse(data)
                if(res.table === "orderBookL2_25"){
                    if(res.action === "partial"){
                        dispatch({
                            type: "recentTrade/partial",
                            payload:{
                                depthData:res.data
                            }
                        })
                    }
                    if(res.action === "update"){
                        dispatch({
                            type: "recentTrade/update",
                            payload:{
                                updataData:res.data
                            }
                        })
                    }
                }else if(res.table === "trade"){
                    // if(res.action === "partial"){
                    //     dispatch({
                    //         type: "recentTrade/save",
                    //         payload:{
                    //             dataSource:res.data
                    //         }
                    //     })
                    // }
                    if(res.action === "insert"){
                        dispatch({
                            type: "recentTrade/insert",
                            payload:{
                                dataSource:res.data
                            }
                        })
                    }
                }else if(res.table === "instrument"){
                    if(res.action === "partial"){
                        dispatch({
                            type: "instrument/instrumentupdate",
                            payload:{
                                instrumentData:res.data[0]
                            }
                        })
                    }
                    if(res.action === "update"){
                        dispatch({
                            type: "instrument/instrumentupdate",
                            payload:{
                                instrumentData:res.data[0]
                            }
                        })
                    }
                }
            }

        };
        this.ws.onclose = function (evt) {
        };
        this.ws.onerror = function () {
        }
        this.ws.onconnecting = function () {
        }
    }
    componentWillUnmount = () => {
        this.ws.close();
    }
    renderItem = (l) => {
        switch (l.i) {
            case "0":
                return <TotalRight item={l} />
                break;
            case "1":
                return <Kline item={l} />
                break;
            case "2":
                return <RecentTrade item={l} />
                break;
            case "3":
                return <InstrumentMarket item={l} />
                break;
            case "4":
                return <InstrumentDetal item={l} />
                break;
            case "5":
                return <OrderCommit item={l} />;
                break;
            case "6":
                return <OrderList item={l} />
                break;
            case "7":
                return <Depthchart item={l} />
                break;
            case "8":
                return <UserOrder item={l} />
                break;
            case "9":
                return <Perpetual item={l} />
                break;
            case "10":
                return <PositionHold item={l} />
                break;
        }
    }
    render() {
        return (
            <div>
                <GridContent
                    name="icon-transaction"
                    titles={["总权益", "行情", "近期交易", "合约市场", "合约明细", "提交委托", "委托列表", "深度图", "", "永续(XXX)", "持有仓位(XXX)"]}
                    cols={{ lg: 24, md: 20, sm: 16, xs: 12, xxs: 8 }}
                    defaultLayouts={
                        {
                            lg: [
                                { x: 0, y: 0, w: 5, h: 3, i: '0' },
                                { x: 5, y: 2, w: 8, h: 10, i: '1' },
                                { x: 18, y: 6, w: 6, h: 8, i: '2' },
                                { x: 0, y: 3, w: 5, h: 9, i: '3' },
                                { x: 0, y: 12, w: 5, h: 6, i: '4' },
                                { x: 13, y: 2, w: 5, h: 10, i: '5' },
                                { x: 18, y: 12, w: 6, h: 10, i: '6' },
                                { x: 5, y: 18, w: 13, h: 6, i: '7' },
                                { x: 5, y: 22, w: 19, h: 8, i: '8' },
                                { x: 5, y: 0, w: 13, h: 2, i: '9' },
                                { x: 0, y: 22, w: 5, h: 8, i: '10' },
                            ]
                        }
                    }
                    renderItem={this.renderItem}
                />
            </div>
        );
    }
}
export default connect(() => {
    return {}
})(
    Index
)
