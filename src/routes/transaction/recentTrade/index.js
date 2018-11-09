import React, { Component } from 'react'
import './index.less';
import { Table,Icon } from 'quant-ui';
import { connect } from 'dva';
import moment from "moment";
class Index extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "recentTrade/getTrade",
        })
    }
    render() {
        const { dataSource } = this.props;
        return (
            <div className="recentTrade">
                <table cellspacing="0" rules="cols">
                    <tbody>
                        {dataSource.map((ele, index, arr) => {
                            let className = "red " + ele.anite;
                            if(ele.side == "Buy"){
                                className = "green " + ele.anite
                            }
                            return (
                                <tr className={className} key={ele.trdMatchID}>
                                    <td >
                                        <div>{ele.icon&&<Icon type={ele.icon} style={{marginRight:"4px"}} theme="outlined" />}{ele.price}</div>
                                    </td>
                                    <td className="" >
                                        <div>{ele.size}</div>
                                    </td>
                                    <td className="">
                                        <div>{moment(ele.timestamp).format("HH:mm:ss")}</div>
                                    </td>
                                    <td className="">
                                        <div>{ele.side.slice(0, 1)}</div>
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(({ recentTrade, loading }) => {
    const { dataSource } = recentTrade
    console.log("***********", recentTrade)
    return {
        dataSource
    }
})(
    Index
)

