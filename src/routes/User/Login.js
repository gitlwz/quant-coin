import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Icon, Login } from 'quant-ui';
import { getUserUserlogin } from "../../utils/authority";
const { Tab, UserName, Password, Submit, Mobile, Captcha } = Login;
let userdata = {}
class LoginPage extends Component {
    state = {
        type: 'account',
    };
    componentWillMount = () => {
        if (!!this.props.remember) {
            userdata = getUserUserlogin() || {}
        } else {
            userdata = {}
        }
    }

    onTabChange = type => {
        this.setState({ type });
    };

    handleSubmit = (err, values) => {
        const { type } = this.state;
        const { dispatch } = this.props;
        if (!err) {
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type,
                },
            });
        }
    };

    changeCheckbox = e => {
        const { dispatch } = this.props;
        dispatch({
            type: "login/changeCheckbox",
            payload: {
                remember: e.target.checked
            }
        })
    };
    render() {
        const { remember } = this.props;
        const { type } = this.state;
        return (
            <div className={'qdp-login-main'}>
                <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
                    <Tab key="account" tab="账户密码登录">
                        <UserName defaultValue={userdata.userName} name="userName" placeholder="请输入账号" />
                        <Password defaultValue={userdata.password} name="password" placeholder="请输入密码" />
                    </Tab>
                    <Tab key="mobile" tab="手机号登录">
                        <Mobile name="mobile" />
                        <Captcha name="captcha" />
                    </Tab>
                    <div>
                        <Checkbox checked={remember} onChange={this.changeCheckbox}>
                            记住密码
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            忘记密码
                        </a>
                    </div>
                    <Submit loading={false}>登录</Submit>
                    <div className={'qdp-login-other'}>
                        其他登录方式
                        <Icon className={'qdp-login-icon'} type="alipay-circle" />
                        <Icon className={'qdp-login-icon'} type="taobao-circle" />
                        <Icon className={'qdp-login-icon'} type="weibo-circle" />
                        <Link className={'qdp-login-register'} to="/user/register">
                            注册账户
                        </Link>
                    </div>
                </Login>
            </div>
        );
    }
}
export default connect(({ login, loading }) => {
    const { userdata, remember } = login;
    return {
        userdata,
        remember
    }
})(LoginPage)
