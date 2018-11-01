/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:08:30 
 * @Last Modified by: 刘文柱
 * @Last Modified time: 2018-10-18 10:21:13
 */
import fetch from 'dva/fetch';
import { notification,message ,language} from 'quant-ui';
import { routerRedux } from 'dva/router';
import store from '../index';
import { stringify } from 'qs';
let $ = language.getLanguageData;
const codeMessage = {
    200: $('服务器成功返回请求的数据。'),
    201: $('新建或修改数据成功。'),
    202: $('一个请求已经进入后台排队（异步任务）。'),
    204: $('删除数据成功。'),
    400: $('发出的请求有错误，服务器没有进行新建或修改数据的操作。'),
    401: $('用户没有权限（令牌、用户名、密码错误）。'),
    403: $('用户得到授权，但是访问是被禁止的。'),
    404: $('发出的请求针对的是不存在的记录，服务器没有进行操作。'),
    406: $('请求的格式不可得。'),
    410: $('请求的资源被永久删除，且不会再得到的。'),
    422: $('当创建一个对象时，发生一个验证错误。'),
    500: $('服务器发生错误，请检查服务器。'),
    502: $('网关错误。'),
    503: $('服务不可用，服务器暂时过载或维护。'),
    504: $('网关超时。'),
};
const frameCodeMessage = {
    101:$("无权限访问"),
    102:$("访问版本不支持"),
    103:$("会话失效"),
    104:$("请求无对应服务"),
    105:$("请求接口错误"),
    106:$("返回对象无法做json对象转换"),
    107:$("请求参数个数错误"),
    108:$("请求参数类型错误"),
    109:$("请求参数无法转换java对象"),
    110:$("后台业务处理遇到未知错误"),
    111:$("entity定义错误，没有主键Id"),
    112:$("数据库无法获得连接"),
    113:$("字段验证发生异常"),
    114:$("服务访问过频"),
}
const requestHeader = {
    'Accept': 'text/plain;',
    'Content-Type': 'application/json',
    'mode': "cors",
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
}
function parseJSON(response) {
    return response.json();
}
function checkStatus(response) {

    let frameCode = response.headers.get('error_code');
    if(!!frameCode){
        if(frameCode == 100){
            const error = new Error();
            error.name = 401;
            error.response = response;
            throw error;
        }

        if(frameCode == 101){
            const error = new Error();
            error.name = 403;
            error.response = response;
            throw error;
        }

        if(frameCode < 200){
            const errortext = frameCodeMessage[frameCode]
            notification.error({
                message: `${$("请求错误")} ${frameCode}: ${response.url}`,
                description: errortext,
            });
            const error = new Error(errortext);
            error.name = frameCode;
            error.response = response;
            throw error;
        }
    }
    
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `${$("请求错误")} ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, newOptions,showMessage = true) {
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if (data.errorCode == 0) {
                let resData = data;
                if (resData != '' && resData.data != '')
                    resData.data = JSON.parse(resData.data)
                return resData;
            } else {
                showMessage&&message.error(data.errorMsg)
                return data
            }
        })
        .catch(e => {
            const { dispatch } = store;
            const status = e.name;
            if (status === 401) {
                dispatch({
                    type: 'login/logout',
                });
                return{
                    errorCode:1,
                };
            }
            if (status === 403) {
                dispatch(routerRedux.push('/exception/403'));
                return{
                    errorCode:1,
                };
            }
            if (status <= 504 && status >= 500) {
                dispatch(routerRedux.push('/exception/500'));
                return{
                    errorCode:1,
                };
            }
            if (status >= 404 && status < 422) {
                dispatch(routerRedux.push('/exception/404'));
                return{
                    errorCode:1,
                };
            }
            // showMessage&&notification.error({
            //     message: `请求错误 返回数据不存在！`,
            // });
            return {
                errorCode:1,
            }
        });
}

function GET(url,params,showMessage) {

    return request(url, {
        method: "POST",
        headers:requestHeader,
        body: stringify(params),
        credentials: 'include'
    },showMessage)
}

/**
 * 观看代码人看到此处请不要吐槽前端开发，完全是被后台逼的
 */
/**
 * 
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {Boolean} showMessage 是否显示错误提示，默认为false 
 */
function POST(url, params,showMessage) {
    let _params = { 'params': JSON.stringify(params) }
    return request(url, {
        method: "POST",
        headers:requestHeader,
        body: stringify(_params),
        credentials: 'include',
        'Accept': 'text/plain;',
        'Content-Type': 'application/json',
        'mode': "cors",
    },showMessage)
}
function UploadMethod(url,params,showMessage){
    return request(url, {
        method: "POST",
        body: params,
        credentials: "include"
    },showMessage).then(resData => {
        let data = resData.data;
        if(!!data){
            if(data.errorCode > 100){
                message.error( data.errorMsg)
            }else{
                message.success(data.errorMsg)
            }
            return data
        }
        return resData
    })
}
function Download(url,fileName,type,entity,params){
    var argsCount = arguments.length;
    if(argsCount < 4) {
        throw new Error('call export with wrong params.');
    }

    var params = params;

    var requestParams = {
        args: JSON.stringify(params),
        fileName: fileName,
        type: type,
        entity: JSON.stringify(entity)
    }

    var frameName = "downloadFrame_" + Math.floor(Math.random() * 1000);
    var iframe = document.createElement("iframe");
    iframe.name = frameName;
    iframe.style.display = "none";

    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "params";
    input.value = JSON.stringify(requestParams);

    var form = document.createElement("form");
    form.target = frameName;
    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    form.appendChild(input);
    iframe.appendChild(form);

    document.body.appendChild(iframe);
    form.submit();
}
export { GET };
export { POST };
export { Download };
export { UploadMethod };

