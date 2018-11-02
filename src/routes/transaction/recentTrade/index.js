import React, { Component } from 'react'
import './index.less';
import { Table } from 'quant-ui';
const columns = [{
    title: 'price',
    dataIndex: 'price',
    align: 'center',
    width: '25%',
}, {
    title: 'size',
    dataIndex: 'size',
    align: 'center',
    width: '25%',
}, {
    title: 'timestamp',
    dataIndex: 'timestamp',
    align: 'center',
    width: '25%',
}, {
    title: 'side',
    dataIndex: 'side',
    align: 'center',
    width: '25%',
}];
const data = [{
    key: '1',
    price: '6666',
    size: 32,
    timestamp: '15:12:12',
    side: 'B',
}, {
    key: '2',
    price: '7777',
    size: 32,
    timestamp: '15:12:12',
    side: 'S',
}];
class index extends Component {
    constructor(props){
        super(props)
    }
    onRow = (record) => {
        let className = "";
        if(record.side == "B"){
            className = "green"
        }else{
            className = "red"
        }
        return {
            className
        }
    }
    render() {
        return (
            <div className="recentTrade">
                <Table
                    onRow={this.onRow}
                    bordered pagination={false} showHeader={false} columns={columns} dataSource={data} size="small"
                />
            </div>
        )
    }
}

export default index
