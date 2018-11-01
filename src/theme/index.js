/*
 * @Author: 刘文柱 
 * @Date: 2018-10-18 10:09:05 
 * @Last Modified by:   刘文柱 
 * @Last Modified time: 2018-10-18 10:09:05 
 */
import { theme } from 'quant-ui';
switch (theme.getCurrentColor()) {
    case "default":
        break;
    case "red":
        import('./red.less')
        break;
    case "green":
        import('./green.less');
        break;
    case "purple":
        import('./purple.less');
        break;
    default:
        break;
}