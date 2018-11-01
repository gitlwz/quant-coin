/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:10:33 
 * @Last Modified by:   刘文柱 
 * @Last Modified time: 2018-10-18 10:10:33 
 */
import React, { PureComponent } from 'react';
import { theme, Icon, language,utils,  } from 'quant-ui';
import { Link } from 'dva/router';
import { connect } from 'dva';
import config from "../../common/config.js";
import RightContent from "./RightContent.js";
const { store } = utils;
const { getCurrentColor, refreshColor, setCurrentColor } = theme;
let { getCurrentLanguage, setCurrentLanguage, refreshLanguage, getLanguageData } = language;
let $ = getLanguageData;
class GlobalHeader extends PureComponent {
    state = {
        icontype: "arrows-alt"
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    triggerResizeEvent = () => {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    
    
    render() {
        const {
            collapsed,
            isMobile,
        } = this.props;
        return (
            <div className={'GlobalHeader header'}>
                {isMobile && [
                    <Link to="/" className={'logo'} key="logo">
                        <img src={config.LOGO} alt="logo" width="32" />
                    </Link>
                ]}

                <Icon
                    className={'trigger'}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <RightContent isMobile={isMobile}/>
            </div>

        );
    }
}
export default connect(({ loading }) => ({

}))(GlobalHeader)