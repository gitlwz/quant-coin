import React, { Component } from 'react'
import "./index.less";
import { connect } from 'dva';
import { Spin } from 'quant-ui';
import echarts from 'echarts';
let option = {
    grid: { left: 20, top: 10, right: 20, bottom: 30 },
    tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { color: 'rgba(0, 0, 0, 0)' } },
        backgroundColor: '#355475',
        textStyle: { color: '#fff', fontSize: '14px' },
        extraCssText: 'box-shadow: 0 0 16px 0 rgba(0, 0, 0, .2);border-radius: 4px;'
    },
    xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: true },
        splitLine: { show: false },
        scale: true,
        boundaryGap: false,
    },
    yAxis: [{
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
    }],
    series: [
        {
            name: '买单',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 3,
            sampling: 'average',
            itemStyle: { normal: { color: '#4cc453' } },
            lineStyle: { normal: { color: '#9CD7BA' } },
            areaStyle: { color: '#9CD7BA' },
        },
        {
            name: '卖单',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 3,
            sampling: 'average',
            itemStyle: { normal: { color: '#e94c4c' } },
            lineStyle: { normal: { color: '#F399A1' } },
            areaStyle: { color: '#F399A1' },
        }
    ]
}
class Index extends Component {
    constructor(props) {
        super(props)
        this.myChart = null;
        this.state = {
            sellData: [],
            buyData: []
        }
    }
    componentDidMount = () => {
        this.myChart = echarts.init(document.getElementById(`depthchart-charts`))
        this.myChart.setOption(option)
        this.resize = this.myChart.resize;
        window.addEventListener("resize", this.resize);
    }
    componentWillReceiveProps = (props) => {
        const { buyData,sellData } = props;
        if (buyData.length > 0 && sellData.length > 0) {
            let option = {
                xAxis: {
                    min: buyData[buyData.length - 1].price,
                    max: sellData[0].price
                },
                series: [
                    {
                        data: buyData.map((ele)=>([ele.price,ele.all]))
                    },
                    {
                        data: sellData.map((ele)=>([ele.price,ele.all]))
                    }
                ]
            }
            
            this.myChart.setOption(option);
        }
    }
    componentWillUnmount = () => {
        window.removeEventListener("resize", this.resize);
    }
    render() {
        const { loading } = this.props;
        return (
            <div className="depthchart" id="depthchart-charts"></div>
        )
    }
}

export default connect(({ recentTrade, loading }) => {
    const { buyData,sellData } = recentTrade
    return {
        buyData,
        sellData,
        loading: !!loading.effects["recentTrade/getDepth"]
    }
})(
    Index
)

