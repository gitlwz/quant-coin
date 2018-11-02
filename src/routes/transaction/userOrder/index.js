import React, { Component } from 'react'
import { Table, Tabs } from 'quant-ui';
import "./index.less"
const TabPane = Tabs.TabPane;
const columns = [{
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    width: '25%',
}, {
    title: '目前仓位数量',
    dataIndex: 'size',
    align: 'center',
    width: '25%',
}, {
    title: '总',
    dataIndex: 'total',
    align: 'center',
    width: '25%',
}];
const data = [{
    key: '1',
    price: '6666',
    size: 32,
    total: '15:12:12',
}, {
    key: '2',
    price: '7777',
    size: 32,
    total: '15:12:12',
}, {
    key: '3',
    price: '6666',
    size: 32,
    total: '15:12:12',
}, {
    key: '4',
    price: '7777',
    size: 32,
    total: '15:12:12',
}, {
    key: '5',
    price: '6666',
    size: 32,
    total: '15:12:12',
}];
class index extends Component {
    render() {
        return (
            <div className = "userOrder">
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab="仓位" key="1">
                        <Table
                            onRow={this.onRowGreen}
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="当前委托" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="历史委托" key="3">Content of Tab Pane 3</TabPane>
                    <TabPane tab="已成交" key="4">Content of Tab Pane 3</TabPane>
                    <TabPane tab="所有持仓" key="5">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default index
