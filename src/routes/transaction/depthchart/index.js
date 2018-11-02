import React, { Component } from 'react'
import "./index.less";
import echarts from 'echarts';
let option = {
    grid: { left: 10, top: 10, right: 10, bottom: 10 },
    tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { color: 'rgba(0, 0, 0, 0)' } },
        backgroundColor: '#355475',
        textStyle: { color: '#fff', fontSize: '14px' },
        extraCssText: 'box-shadow: 0 0 16px 0 rgba(0, 0, 0, .2);border-radius: 4px;'
    },
    xAxis: {
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        boundaryGap: false,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
            data: [10, 9, 8, 5, 1, '', '', '', '', '']
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
            data: ['', '', '', '', '', 0, 2, 3, 6, 8]
        }
    ]
}
class index extends Component {
    constructor(props) {
        super(props)
        this.myChart = null;
    }
    componentDidMount = () => {
        this.myChart = echarts.init(document.getElementById(`depthchart-charts`))
        this.myChart.setOption(option)
        this.resize = this.myChart.resize;
        window.addEventListener("resize", this.resize);
    }
    componentWillUnmount = () => {
        window.removeEventListener("resize", this.resize);
    }
    render() {
        return (
            <div className="depthchart" id="depthchart-charts"></div>
        )
    }
}

export default index
