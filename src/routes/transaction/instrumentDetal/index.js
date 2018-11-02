import React, { Component } from 'react'
import { Trend  } from 'quant-ui';
import "./index.less";
class index extends Component {
  render() {
    return (
      <div className="instrumentDetal">
        <div className="headPrice">
            <Trend flag="up">6184.0</Trend>
        </div>
        <div className = "content">
            <div className = "lineItem">
                <span className="tooltipWrapper">
                    <span className="key">价格来源</span>
                    <span className="value">BitMEX 指数</span>
                </span>
            </div>
            <div className = "lineItem">
                <span className="tooltipWrapper">
                    <span className="key">BitMEX 指数 的价格</span>
                    <span className="value">6355.68</span>
                </span>
            </div>
        </div>
      </div>
    )
  }
}

export default index
