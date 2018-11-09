import React, { Component } from 'react'
import { Table } from 'quant-ui';
import { connect } from 'dva';
class BuyTable extends Component {
    render() {
        const { buyData } = this.props;
        let _buyData = buyData.slice(0, this.props.positionSetting);
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
                        {_buyData.map((ele, index, arr) => {
                            return <tr className="" key={ele.all}>
                                <td className="price" key={ele.price}>
                                    <div>{ele.price}</div>
                                </td>
                                <td className={"size isNew highlightInc " + ele.dic} key={ele.size}>
                                    <div>{ele.size}</div>
                                </td>
                                <td className="cumSize">
                                    <div>
                                        <div className="depthBar" style={{ width: (ele.all / arr[_buyData.length - 1].all) * 100 + "%" }}>
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
    const { buyData } = recentTrade
    return {
        buyData
    }
})(
    BuyTable
)
