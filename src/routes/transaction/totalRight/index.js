import React, { Component } from 'react'
import "./index.less";
class index extends Component {
  render() {
    return (
      <div className="totalRight">
        <div className="line1">
            <span>折合 </span>
            <span className="lineColor">15265.12345678 </span>
            <span className="lineColor">BTC</span>
        </div>
        <div className="line2">
            <span>≈ </span>
            <span>10252513.49 </span>
            <span>USD </span>
        </div>
      </div>
    )
  }
}

export default index
