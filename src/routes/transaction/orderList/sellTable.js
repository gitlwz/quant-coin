import React, { Component } from 'react'
import { Table } from 'quant-ui';
import { connect } from 'dva';
class SellTable extends Component {
    onRowRed = (record, index) => {
        let className = "red";
        if (index % 2 == 0) {
            className += " odd";
        }
        return {
            className
        }
    }

    render() {
        const { sellData } = this.props;
        let _sellData = sellData.slice(sellData.length - this.props.positionSetting, sellData.length);
        return (
            <div className="table-container-inner">
                <table cellspacing="0">
                    <thead>
                        <tr>
                            <th className="price">
                                <div className="th-inner">
                                    <span>价格</span>
                                </div>
                            </th>
                            <th className="size">
                                <div className="th-inner">
                                    <span>目前仓位数量</span>
                                </div>
                            </th>
                            <th className="cumSize">
                                <div className="th-inner">
                                    <span>总</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {_sellData.map((ele, index, arr) => {
                            return <tr className="hover-green" key={ele.all}>
                                <td className="price green">
                                    <div>{ele.price}</div>
                                </td>
                                <td className={"size isNew highlightInc "+ele.dic}>
                                    <div>{ele.size}</div>
                                </td>
                                <td className="cumSize">
                                    <div>
                                        <div className="depthBar depthBar-green" style={{ width: (ele.all / arr[0].all) * 100 + "%" }}>
                                        </div>
                                        <span className="output">{ele.all}</span>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(({ recentTrade }) => {
    const { sellData } = recentTrade
    return {
        sellData
    }
})(
    SellTable
)
