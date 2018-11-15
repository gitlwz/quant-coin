import React, { Component } from 'react'
import { Icon, Spin } from 'quant-ui';
import "./index.less";
import { connect } from 'dva';
class Index extends Component {
    componentWillMount = () => {
        // const { dispatch } = this.props;
        // dispatch({
        //     type: "instrument/getInstrumentBySymbol",
        //     payload: { symbol: "XBTUSD" }
        // })
    }
    render() {
        const { instrumentData, loading } = this.props;
        let instrument = instrumentData;
        return (
            <Spin spinning={loading}>
                <div className="instrumentDetal">
                    <div className={"headPrice "+instrument.icon}>
                    {instrument.lastPrice}<Icon type={instrument.icon} theme="outlined" />
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
                                <span className="value">{instrument.indicativeSettlePrice}</span>
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