import React, { Component } from 'react'
import './index.less';
import { Table } from 'quant-ui';
import { connect } from 'dva';
import moment from "moment";
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
    render:(text) => {

        return moment(text).format("HH:mm:ss");  
    }
}, {
    title: 'side',
    dataIndex: 'side',
    align: 'center',
    width: '25%',
    render:(text) => {
        if(text === "Buy"){
            return <span>B</span>
        }else{
            return <span>S</span>
        }
    }
}];
class Index extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "recentTrade/getTrade",
        })
    }
    onRow = (record, index) => {
        let className = "";
        if(record.side === "Buy"){
            className = "green"
        }else{
            className = "red"
        }
        if(index % 2 == 0){
            className += " odd";
        }
        return {
            className
        }
    }
    render() {
        const { dataSource ,loading} = this.props;
        return (
            <div className="recentTrade">
                <Table
                    onRow={this.onRow}
                    bordered 
                    loading={loading}
                    pagination={false} 
                    showHeader={false} 
                    columns={columns} 
                    rowKey="trdMatchID"
                    dataSource={dataSource} 
                    size="small"
                />
            </div>
        )
    }
}

export default connect(({recentTrade,loading}) => {
    const { dataSource } = recentTrade
    return {
        dataSource,
        loading:!!loading.effects["recentTrade/getTrade"]
    }
})(
    Index
)

