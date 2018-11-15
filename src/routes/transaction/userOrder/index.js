import React, { Component } from 'react'
import { Table, Tabs } from 'quant-ui';
import "./index.less"
const TabPane = Tabs.TabPane;
const columns = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '数量',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '委托价格',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '完全成交',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '成交价格',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '类型',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '状态',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '时间',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '委托ID',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '操作',
    dataIndex: 'close',
    align: 'center',
    render: (record, obj, index) => {
        if (index % 2 === 0) {
            return <a>清除</a>
        } else {
            return <a>撤单</a>
        }
    }
}];
const columnsActive = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '数量',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '委托价格',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '完全成交',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '剩余',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '成交价格',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '类型',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '状态',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '委托ID',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
}, {
    title: '操作',
    dataIndex: 'close',
    align: 'center',
    render: (record, obj, index) => {
        return <a>撤单</a>
    }
}];
const columnsStop = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '数量',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '委托价格',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '完全成交',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '触发价格',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '触发价格',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '类型',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '状态',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '成交价格',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
}, {
    title: '操作',
    dataIndex: 'close',
    align: 'center',
    render: (record, obj, index) => {
        return <a>撤单</a>
    }
}];
const columnsReady = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '数量',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '成交数量',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '剩余',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '成交价格',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '委托价格',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '类型',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '价值',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '委托ID',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
}];
const columnsHis = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '数量',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '委托价格',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '完全成交',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '触发价格',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '成交价格',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '类型',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '状态',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '委托ID',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
}];
const columnsPosition = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
}, {
    title: '目前仓位数',
    dataIndex: 'position',
    align: 'center',
}, {
    title: '价值',
    dataIndex: 'number',
    align: 'center',
}, {
    title: '开仓价格',
    dataIndex: 'openPrice',
    align: 'center',
}, {
    title: '标记价格',
    dataIndex: 'positionPrice',
    align: 'center',
}, {
    title: '强平价格',
    dataIndex: 'positionMar',
    align: 'center',
}, {
    title: '保证金',
    dataIndex: 'positionBoom',
    align: 'center',
}, {
    title: '未实现盈亏(回报率%)',
    dataIndex: 'noRealice',
    align: 'center',
}, {
    title: '已实现盈亏',
    dataIndex: 'realice',
    align: 'center',
}, {
    title: '',
    dataIndex: 'time',
    align: 'center',
}, {
    title: '操作',
    dataIndex: 'close',
    align: 'center',
    render: (record, obj, index) => {
        return (
            <div>
                <a style={{marginRight:20}}>平仓</a>
                <a>市价</a>
            </div>
        )
    }
}];
const columnsClose = [{
    title: '合约',
    dataIndex: 'instrument',
    align: 'center',
    render: (record, obj, index) => {
        return (
            <span>{record}</span>
        )
    }
}, {
    title: '已实现盈亏',
    dataIndex: 'position',
    align: 'center',
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
                    <TabPane tab="XBTUSD[0]" key="1">
                        <Table
                            bordered columns={columns} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="活动委托" key="2">
                        <Table
                            bordered columns={columnsActive} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="止损委托" key="3">
                        <Table
                            bordered columns={columnsStop} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="已成交" key="4">
                        <Table
                            bordered columns={columnsReady} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="委托历史" key="5">
                        <Table
                            bordered columns={columnsHis} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="持有仓位" key="6">
                        <Table
                            bordered columns={columnsPosition} dataSource={data} size="small"
                        />
                    </TabPane>
                    <TabPane tab="已平仓仓位" key="7">
                        <Table
                            bordered columns={columnsClose} dataSource={data} size="small"
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default index
