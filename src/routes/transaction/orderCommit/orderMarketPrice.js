import React, { Component } from 'react'
import "./index.less";
import { Table, Icon, Input, Row, Col, Radio, Button } from 'quant-ui';
const RadioGroup = Radio.Group;
export class OrderMarketPrice extends Component {
    render() {
        return (
            <div className="orderLimitPrice">
                <div className="topRadio">
                    <Row className="marginB10">
                        <Col span={16} offset={8}>
                            <RadioGroup defaultValue={1}>
                                <Radio value={0}>开仓</Radio>
                                <Radio value={1}>平仓</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row className="marginB10">
                        <Col span={8}>
                            <span>保证金类型</span>
                        </Col>
                        <Col span={16}>
                            <RadioGroup defaultValue={2}>
                                <Radio value={2}>全仓</Radio>
                                <Radio value={3}>逐仓</Radio>
                            </RadioGroup>
                        </Col>

                    </Row>
                </div>
                <div className="inputNAndP">
                    <Row className="marginB10">
                        <Col span={3}>
                            <span className="firstSpan">数量</span>
                        </Col>
                        <Col span={14} offset={1}>
                            <Input></Input>
                        </Col>
                        <Col span={4} offset={1}>
                            <div className="currency" >USD</div>
                        </Col>
                    </Row>
                </div>
                <div className="buttonMid">
                    <Row>
                        <Col span={11}>
                            <Button className="green" block>买入/做多</Button>
                        </Col>
                        <Col span={11} offset={1}>
                            <Button className="red" block>卖出/做空</Button>
                        </Col>
                    </Row>
                </div>
                <div className="totalData">
                    <Row className="totalDataRow">
                        <Col span={12}>
                            <span className="specialSpan">成本：</span>
                            <span>0.0000 XBT</span>
                        </Col>
                        <Col span={12}>
                            <span className="specialSpan">总额：</span>
                            <span>0.0000 XBT</span>
                        </Col>
                    </Row>
                    <Row className="totalDataRowSecond">
                        <Col span={12}>
                            <span>可用余额：</span>
                            <span>0.0000 XBT</span>
                        </Col>
                    </Row>
                </div>
                <div className="riskLimit">
                    <Row>
                        <Col span={6}>
                            <span>风险限额</span>
                        </Col>
                        <Col span={12} offset={5} className="riskLimitRow">
                            <span className="riskLimitSpan">0.0000/50XBT</span>
                            <Icon style={{cursor: "pointer"}} type="form" theme="outlined" />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default OrderMarketPrice
