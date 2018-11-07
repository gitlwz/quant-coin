import React, { Component } from 'react'
import './index.less';
class index extends Component {
  render() {
    return (
        <div className="perpetual">
            <div className="title">
                <div className="titleLine1">
                    <span>动态权益/BTC1</span>
                </div>
                <div>
                    <span>15,265.12345678</span>
                </div>
            </div>
            <div className="title">
                <div className="titleLine1">
                    <span>可用/BTC2</span>
                </div>
                <div>
                    <span>15,265.12345678</span>
                </div>
            </div>
            <div className="title">
                <div className="titleLine1">
                    <span>冻结保证金/BTC3</span>
                </div>
                <div>
                    <span>15,265.12345678</span>
                </div>
            </div>
            <div className="title">
                <div className="titleLine1">
                    <span>占用保证金/BTC4</span>
                </div>
                <div>
                    <span>15,265.12345678</span>
                </div>
            </div>
            <div className="title">
                <div className="titleLine1">
                    <span>风险系数/BTC4</span>
                </div>
                <div>
                    <span>15,265.12345678</span>
                </div>
            </div>
            <div className="title">
                <div className="titleLine1">
                    <a>更多>></a>
                </div>
            </div>
        </div>
    )
  }
}

export default index
