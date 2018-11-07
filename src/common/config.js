/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:10:38 
 * @Last Modified by: 刘文柱
 * @Last Modified time: 2018-11-01 18:05:19
 */
import { language, Icon } from "quant-ui";
import React from 'react';
import Logo from '../assets/logo.png';
import LogoAndTitle from '../assets/logo-title.png';
import LoginLogo from '../assets/login-logo.png';
import LOGIN_BG from "../assets/background.png";
import flowImg from "../assets/flow-img.jpg";
//中文配置
let zhConfig = {
    'TITLE': "量投",                        //标题
    "LOGO": Logo,                           //LOGO  32x32
    "LOGOANTTITLE": LogoAndTitle,            //LOGO带标题  height 小于 50  width 小于 220
    "LOGON_LOGO": LoginLogo,                 //登录页标题
    "LOGON_DESC": "量投科技XXXXXXXXXXXX",      //登录页描述
    "LOGIN_BG": LOGIN_BG,                    //登陆页背景
    "LEAD_IMG": flowImg,                    //操作引导
    "Help": flowImg,                        //帮助文档  bas64图片 或者 url
    "privacy": "当前版本:0.125",              //关于
    "flowImg": flowImg,                      //首页流程图
    "isTop": true,                               //导航栏是否在顶部
    "FOOTER": <span>Copyright <Icon type="copyright" /> 2018 量投极速柜台交易系统</span>  //页脚
}

//英文配置
let enConfig = {
    'TITLE': "量投",                     //标题
    "LOGO": Logo,                           //LOGO  32x32
    "LOGOANTTITLE": LogoAndTitle,            //LOGO带标题
    "LOGON_LOGO": LoginLogo,                 //登录页标题
    "LOGON_DESC": "量投科技 XXXXXXXXX",      //登录页描述
    "LOGIN_BG": LOGIN_BG,                    //登陆页背景
    "LEAD_IMG": flowImg,                    //操作引导
    "Help": flowImg,                        //帮助文档  bas64图片 或者 url
    "privacy": "当前版本:0.125",              //关于
    "flowImg": flowImg,                      //首页流程图
    "isTop": true,   
    "FOOTER": <span>Copyright <Icon type="copyright" /> 2018 QuantDo Plantform</span>  //页脚
}

let config = zhConfig;
if (language.getCurrentLanguage() === "en_US") {
    config = enConfig;
}
export default config;