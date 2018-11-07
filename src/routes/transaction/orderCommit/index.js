import React, { Component } from 'react'
import "./index.less";
import OrderLimitPrice from "./orderLimitPrice.js";
import OrderMarketPrice from "./orderMarketPrice.js";
import { Table, Tabs } from 'quant-ui';
const TabPane = Tabs.TabPane;

class Index extends Component {
    render() {
        return (
            <div className="orderCommit">
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab="限价" key="1">
                        <OrderLimitPrice />
                    </TabPane>
                    <TabPane tab="市价" key="2">
                        <OrderMarketPrice />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Index
