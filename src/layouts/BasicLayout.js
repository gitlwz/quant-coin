import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message } from 'quant-ui';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import config from "../common/config.js";
import Header from "../components/Header";
const { Content } = Layout;
const { AuthorizedRoute, check } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `${item.path}`,
                to: `${item.children[0].path}`,
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
    const result = {};
    const childResult = {};
    for (const i of menuData) {
        if (!routerData[i.path]) {
            result[i.path] = i;
        }
        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
        }
    }
    return Object.assign({}, routerData, result, childResult);
};

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class BasicLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    };

    state = {
        isMobile,
    };

    getChildContext() {
        const { location, routerData } = this.props;
        return {
            location,
            breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
        };
    }

    componentDidMount() {
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = config.TITLE;
        let currRouterData = null;
        // match params path
        for (const key in routerData) {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key];
                break;
            }
        }
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name} - ${config.TITLE}`;
        }
        return title;
    }

    getBaseRedirect = () => {
        // According to the url parameter to redirect
        // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
        const urlParams = new URL(window.location.href);

        const redirect = urlParams.searchParams.get('redirect');
        // Remove the parameters in the url
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            const { routerData } = this.props;
            // get the first authorized route path in routerData
            const authorizedPath = Object.keys(routerData).find(
                item => check(routerData[item].authority, item) && item !== '/'
            );
            return authorizedPath;
        }
        return redirect;
    };

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };
    render() {
        const {
            collapsed,
            routerData,
            match,
            location,
        } = this.props;
        const { isMobile: mb } = this.state;
        const baseRedirect = this.getBaseRedirect();
        let isTop = config.isTop;
        const layout = (
            <Layout>
                {isTop && !isMobile ? null : <SiderMenu
                    logo={collapsed?config.LOGO:config.LOGOANTTITLE}
                    Authorized={Authorized}
                    menuData={getMenuData()}
                    collapsed={collapsed}
                    location={location}
                    isMobile={mb}
                    onCollapse={this.handleMenuCollapse}
                />}
                <Layout >
                    <Header
                        logo={collapsed?config.LOGO:config.LOGOANTTITLE}
                        Authorized={Authorized}
                        menuData={getMenuData()}
                        collapsed={collapsed}
                        location={location}
                        isMobile={mb}
                        onCollapse={this.handleMenuCollapse}
                        {...this.props}
                    />
                    <Content style={{ margin: '8px 0px', height: '100%' }}>
                        <Switch>
                            {redirectData.map(item => (
                                <Redirect key={item.from} exact from={item.from} to={item.to} />
                            ))}
                            {getRoutes(match.path, routerData).map(item => (
                                <AuthorizedRoute
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                    authority={item.authority}
                                    redirectPath="/exception/403"
                                />
                            ))}
                            <Redirect exact from="/" to={baseRedirect} />
                            <Route render={NotFound} />
                        </Switch>
                    </Content>
                    
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}
export default connect(({ user, global = {}, loading }) => ({
    collapsed: global.collapsed,
}))(BasicLayout)