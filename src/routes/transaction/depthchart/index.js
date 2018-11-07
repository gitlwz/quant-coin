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
        const { dispatch } = this.props;
        dispatch({
            type: "recentTrade/getDepth",
        })
    }
    componentWillReceiveProps = (props) => {
        const { depthData } = props;
        let sellData = [];
        let buyData = [];
        let sellDataC = [];
        let buyDataC = [];
        depthData.filter((value) => {
            if (value.side === "Buy") {
                buyData.push([value.price, value.size]);
                buyDataC.push([value.price, value.size]);
            } else {
                sellData.push([value.price, value.size]);
                sellDataC.push([value.price, value.size]);
            }
        })
        for (let i = 0; i < buyData.length; i++) {
            for (let j = 0; j < i; j++) {
                buyDataC[i][1] += buyData[j][1];
            }
        }
        for (let i = sellData.length - 1; i >= 0; i--) {
            for (let j = sellData.length - 1; j > i; j--) {
                sellDataC[i][1] += sellData[j][1];
            }
        }
        if (buyDataC.length > 0 && sellDataC.length > 0) {
            let option = {
                xAxis: {
                    min: buyDataC[buyDataC.length - 1][0],
                    max: sellDataC[0][0]
                },
                series: [
                    {
                        data: buyDataC
                    },
                    {
                        data: sellDataC
                    }
                ]
            }
            this.myChart.setOption(option);
            this.resize = this.myChart.resize;
            window.addEventListener("resize", this.resize);
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
    const { depthData } = recentTrade
    return {
        depthData,
        loading: !!loading.effects["recentTrade/getDepth"]
    }
})(
    Index
)

