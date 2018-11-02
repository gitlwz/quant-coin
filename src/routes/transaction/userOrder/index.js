import React, { Component } from 'react'
import { Table, Tabs } from 'quant-ui';
import "./index.less"
const TabPane = Tabs.TabPane;
const columns = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '持仓方向',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '持仓量',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '开仓均价',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '持仓均价',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '持仓保证金',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '爆仓价',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '未实现盈亏',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '已实现盈亏',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '平仓',
    dataIndex: 'close',
    align: 'center',
    render: (record) => {
        return <a>平仓</a>
    }
}];
const data = [{
    key: '1',
    instrument: '6666',
    position: 123,
    number: 32,
    openPrice: '15:12:12',
    positionPrice: '15:12:12',
    positionMar: '15:12:12',
    positionBoom: '15:12:12',
    noRealice: '15:12:12',
    realice: '15:12:12',
    close: '15:12:12',
}, {
    key: '1',
    instrument: '6666',
    position: 123,
    number: 32,
    openPrice: '15:12:12',
    positionPrice: '15:12:12',
    positionMar: '15:12:12',
    positionBoom: '15:12:12',
    noRealice: '15:12:12',
    realice: '15:12:12',
    close: '15:12:12',
}];
class index extends Component {
    render() {
        return (
            <div className="userOrder">
                <Tabs defaultActiveKey="1" animated={false}>
                    <TabPane tab="仓位" key="1">
                        <Table
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="当前委托" key="2">
                        <Table
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="历史委托" key="3">
                        <Table
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="已成交" key="4">
                        <Table
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="所有持仓" key="5">
                        <Table
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default index
