import React, { Component } from 'react'
import './index.less';
import {Icon, Select } from 'quant-ui';
import { connect } from 'dva';
import BuyTable from "./buyTable";
import SellTable from "./sellTable";
const Option = Select.Option;

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            positionSetting: "10"
        }
    }
    onChange = (value) => {
        this.setState({
            positionSetting: value
        })
    }
    render() {
        const {icon, lastPrice} = this.props
        return (
            <div className="orderList">
                <SellTable positionSetting={this.state.positionSetting}/>
                <div className={"headPrice " +icon}>
                   {lastPrice}<Icon type={icon}/>
                </div>
                <BuyTable positionSetting={this.state.positionSetting}/>
                <div className="positionSetting">
                    <span className="position">盘口档位设置</span>
                    <Select defaultValue="10" onChange={this.onChange} style={{ width: 120 }}>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                    </Select>
                </div>
            </div>
        )
    }
}

export default connect(({instrument}) => {
    const { instrumentData } = instrument
    return {
        icon:instrumentData.icon,
        lastPrice:instrumentData.lastPrice,
    }
})(
    Index
)
