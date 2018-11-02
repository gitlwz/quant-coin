import React, { Component } from 'react'
import "./index.less";
import { Input, Collapse, Table } from 'quant-ui';
const Search = Input.Search;
const Panel = Collapse.Panel;
const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];
class index extends Component {
    render() {
        return (
            <div className="instrumentMarket">
                <div className="search">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="collapse">
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="BTC" key="1">
                            <Table bordered={false} pagination={false} showHeader={false} columns={columns} dataSource={data} size="small" />
                        </Panel>
                        <Panel header="ETH" key="2">
                            <Table bordered={false} pagination={false} showHeader={false} columns={columns} dataSource={data} size="small" />
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }
}

export default index
