import React, { Component } from 'react'
import { TVChartContainer } from '../../../components/TVChartContainer/index';
import "./index.less";
class index extends Component {
    render() {
        return (
            <div className="kline">
                <TVChartContainer /> 
            </div>
        )
    }
}

export default index
