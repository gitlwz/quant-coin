import React, { Component } from 'react'
import "./index.less";
import { Input, Collapse, Table, Spin } from 'quant-ui';
import { connect } from 'dva';
const Search = Input.Search;
const Panel = Collapse.Panel;
const columns = [{
    title: 'symbol',
    dataIndex: 'symbol',
}, {
    title: 'lastPrice',
    dataIndex: 'lastPrice',
}, {
    title: 'prevClosePrice',
    dataIndex: 'prevClosePrice',
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
class Index extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "instrument/getInstrument",
        })
    }
    tableClick = (record) => {
        return {
            onClick: () => {
                const { dispatch } = this.props;
                dispatch({
                    type: "instrument/getInstrumentBySymbol",
                    payload: { symbol: record.symbol }
                })
            },       // 点击行
        };
    }
    renderPanel = (dataSource) => {
        let arr = [];
        for (let value in dataSource) {
            arr.push(
                <Panel header={value} key={value}>
                    <Table
                        key={value}
                        onRow={this.tableClick}
                        bordered={false}
                        pagination={false}
                        showHeader={false}
                        rowKey="symbol"
                        columns={columns}
                        dataSource={dataSource[value]}
                        size="small"
                    />
                </Panel>
            )
        }
        return arr;
    }
    onSearch = (value) => {
        const { dataSource } = this.props;
        for (let key in dataSource) {
            if (key.indexOf(value) !== -1) { }
        }
    }
    render() {
        const { dataSource, loading } = this.props;
        return (
            <Spin spinning={loading}>
                <div className="instrumentMarket">
                    <div className="search">
                        <Search
                            placeholder="input search text"
                            onSearch={this.onSearch}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="collapse">
                        <Collapse defaultActiveKey={['XBT']}>
                            {this.renderPanel(dataSource)}
                        </Collapse>
                    </div>
                </div>
            </Spin>
        )
    }
}

export default connect(({ instrument, loading }) => {
    const { dataSource } = instrument;
    return {
        dataSource,
        loading: !!loading.effects["instrument/getInstrument"]
    }
})(
    Index
)