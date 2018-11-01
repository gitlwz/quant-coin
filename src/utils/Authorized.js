/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:08:35 
 * @Last Modified by:   刘文柱 
 * @Last Modified time: 2018-10-18 10:08:35 
 */
import { Authorized } from 'quant-ui';
import { getAuthority } from './authority';

let _Authorized = Authorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
    _Authorized = Authorized(getAuthority());
};

export { reloadAuthorized };
export default _Authorized;
