/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:10:14 
 * @Last Modified by:   刘文柱 
 * @Last Modified time: 2018-10-18 10:10:14 
 */
import React, { PureComponent } from 'react';
import { Layout } from 'quant-ui';
import { connect } from 'dva';
import GlobalHeader from '../GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import config from "../../common/config.js";
const { Header } = Layout;
class HeaderView extends PureComponent {
    state = {
        visible: true,
    };

    //   componentDidMount() {
    //     document.addEventListener('scroll', this.handScroll, { passive: true });
    //   }

    //   componentWillUnmount() {
    //     document.removeEventListener('scroll', this.handScroll);
    //   }

    getHeadWidth = () => {
        const { isMobile, collapsed } = this.props;
        // if (isMobile || layout === 'topmenu') {
        return '100%';
        // }
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    };
    //   handScroll = () => {
    //     const { autoHideHeader } = this.props;
    //     const { visible } = this.state;
    //     if (!autoHideHeader) {
    //       return;
    //     }
    //     const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    //     if (!this.ticking) {
    //       requestAnimationFrame(() => {
    //         if (this.oldScrollTop > scrollTop) {
    //           this.setState({
    //             visible: true,
    //           });
    //           this.scrollTop = scrollTop;
    //           return;
    //         }
    //         if (scrollTop > 400 && visible) {
    //           this.setState({
    //             visible: false,
    //           });
    //         }
    //         if (scrollTop < 400 && !visible) {
    //           this.setState({
    //             visible: true,
    //           });
    //         }
    //         this.oldScrollTop = scrollTop;
    //         this.ticking = false;
    //       });
    //     }
    //     this.ticking = false;
    //   };

    render() {
        const { isMobile } = this.props;
        const { visible } = this.state;
        const isTop = config.isTop;

        return (
            <Header
                style={{ padding: 0, width: this.getHeadWidth() }}
            >
                {isTop && !isMobile ? (
                    <TopNavHeader
                        {...this.props}
                    />
                ) : (
                        <GlobalHeader
                            {...this.props}
                        />
                    )}
            </Header>
        );
    }
}

export default connect(({ global }) => ({
    collapsed: global.collapsed,
}))(HeaderView);
