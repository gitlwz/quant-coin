import React, { Component } from 'react'
import { Trend, Spin } from 'quant-ui';
import "./index.less";
import { connect } from 'dva';
class Index extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "instrument/getInstrumentBySymbol",
            payload: { symbol: "XBTUSD" }
        })
    }
    render() {
        const { instrumentData, loading } = this.props;
        let instrument = instrumentData[0] ? instrumentData[0] : {};
        return (
            <Spin spinning={loading}>
                <div className="instrumentDetal">
                    <div className="headPrice">
                        <Trend flag="up">{instrument.lastPrice}</Trend>
                    </div>
                    <div className="content">
                        <div className="lineItem">
                            <span className="tooltipWrapper">
                                <span className="key">24小时交易量</span>
                                <span className="value">{instrument.foreignNotional24h} USD</span>
                            </span>
                        </div>
                        <div className="lineItem">
                            <span className="tooltipWrapper">
                                <span className="key">BitMEX 指数 的价格</span>
                                <span className="value">6355.68</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Spin>
        )
    }
}

export default connect(({ instrument, loading }) => {
    const { instrumentData } = instrument;
    return {
        instrumentData,
        loading: !!loading.effects["instrument/getInstrumentBySymbol"]
    }
})(
    Index
)