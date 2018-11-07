import React, { Component } from 'react'
import './index.less';
import { Table, Trend, Select } from 'quant-ui';
const Option = Select.Option;
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
    onRowGreen = (record,index) => {
        let className = "green";
        if(index % 2 == 0){
            className += " odd";
        }
        return {
            className
        }
    }
    onRowRed = (record,index) => {
        let className = "red";
        if(index % 2 == 0){
            className += " odd";
        }
        return {
            className
        }
    }
    render() {
        return (
            <div className="orderList">
                <Table
                    onRow={this.onRowRed}
                    onHeaderRow={this.onHeaderRow}
                    bordered pagination={false} columns={columns} dataSource={data} size="small"
                />
                <div className="headPrice">
                    <Trend flag="up">6184.0</Trend>
                </div>
                <Table
                    onRow={this.onRowGreen}
                    bordered showHeader={false} 
                    pagination={false} 
                    columns={columns} 
                    dataSource={data} size="small"
                />
                <div className="positionSetting">
                    <span className="position">盘口档位设置</span>
                    <Select defaultValue="1" style={{ width: 120 }}>
                        <Option value="1">1</Option>
                        <Option value="5">5</Option>
                        <Option value="9">9</Option>
                    </Select>
                </div>
            </div>
        )
    }
}

export default index
