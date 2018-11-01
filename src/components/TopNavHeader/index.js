/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:09:29 
 * @Last Modified by:   刘文柱 
 * @Last Modified time: 2018-10-18 10:09:29 
 */
import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import config from "../../common/config.js";
export default class TopNavHeader extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            maxWidth:  'calc(100vw - 430px)',
        };
    }

    render() {
        const { maxWidth } = this.state;
        
        return (
            <div className="TopNavHeader">
                <div className={`${'head'} `}>
                    <div
                        ref={ref => {
                            this.maim = ref;
                        }}
                        className={`${'main'} ${ ''}`}
                    >
                        <div className={'left'}>
                            <div className={'logo'} key="logo" id="logo">
                                <Link to="/">
                                    <img src={config.LOGOANTTITLE} alt="logo" />
                                </Link>
                            </div>
                            <div
                                style={{
                                    maxWidth,
                                }}
                            >
                                <BaseMenu {...this.props} style={{ border: 'none', height: 64 }} />
                            </div>
                        </div>
                        <RightContent {...this.props} />
                    </div>
                </div>
            </div>

            
        );
    }
}
