import React, { Component } from 'react'
import "./index.less";
import { Input, Row, Col, Radio, Icon } from 'quant-ui';
const RadioGroup = Radio.Group;

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:1
        }
    }
    onChangeRadio = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    onChangeInput = () => {

    }
    onClick = () => {
    }
    render() {
        return (
            <div className="positionHold">
                <Row className="row">
                    <Col span={6}>杠杆倍数</Col>
                    <Col span={18}><Input placeholder={this.state.value?this.state.value + "x":""} onChange={this.onChangeInput} /></Col>
                </Row>
                <div className="radio">
                    <RadioGroup onChange={this.onChangeRadio} value = {this.state.value}>
                        <Radio value={0}>全仓</Radio>
                        <Radio value={1}>1x</Radio>
                        <Radio value={5}>5x</Radio>
                        <Radio value={10}>10x</Radio>
                    </RadioGroup>
                    <Icon style={{cursor: "pointer"}} onClick={this.onClick} type="form" theme="outlined" />
                </div>
                <div className="description">
                    <p>
                        注意：设置将对当前合约的所有产品生效，且有持仓时不得改动。
                    </p>
                </div>
            </div>
        )
    }
}

export default Index
