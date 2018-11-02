import React, { Component } from 'react'
import { GridContent } from "quant-ui";

import TotalRight from "./totalRight";
import InstrumentMarket from "./instrumentMarket";
import InstrumentDetal from "./instrumentDetal";
import RecentTrade from "./recentTrade";
import OrderList from "./orderList";
import Kline from "./kline";
import Depthchart from "./depthchart";
class Index extends Component {
    constructor(props) {
        super(props);
    }
    renderItem = (l) => {
        switch (l.i) {
            case "0":
                return <TotalRight item={l} />
                break;
            case "1":
                return <Kline item={l}/>
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
                return <span item={l}>5</span>
                break;
            case "6":
                return <OrderList item={l} />
                break;
            case "7":
                return <Depthchart item={l} />
                break;
            case "8":
                return <span item={l}>8</span>
                break;
        }
    }
    render() {
        return (
            <div>
                <GridContent
                    name="icon-transaction"
                    titles={["总权益", "永续xxx", "近期交易", "合约市场", "合约明细", "提交委托", "委托列表", "深度图", "起个名字"]}
                    cols={{ lg: 24, md: 20, sm: 16, xs: 12, xxs: 8 }}
                    defaultLayouts={
                        {
                            lg: [
                                { x: 0, y: 0, w: 5, h: 3, i: '0' },
                                { x: 5, y: 0, w: 13, h: 12, i: '1' },
                                { x: 18, y: 6, w: 6, h: 12, i: '2' },
                                { x: 0, y: 3, w: 5, h: 9, i: '3' },
                                { x: 0, y: 12, w: 5, h: 6, i: '4' },
                                { x: 5, y: 12, w: 13, h: 6, i: '5' },
                                { x: 18, y: 12, w: 6, h: 10, i: '6' },
                                { x: 5, y: 18, w: 13, h: 4, i: '7' },
                                { x: 5, y: 22, w: 19, h: 8, i: '8' },
                            ]
                        }
                    }
                    renderItem={this.renderItem}
                />
            </div>
        );
    }
}
export default Index
