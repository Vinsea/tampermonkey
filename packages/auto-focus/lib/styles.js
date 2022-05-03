import { addStyle, claz } from './util';

/**
 * init styles
 * @returns {undefined}
 */
export default function () {
    addStyle(`
.${claz('vv-dialog-wrapper')}{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background-color: rgba(0,0,0,0.6);
}
.${claz('vv-dialog')} {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    box-sizing: border-box;
}
.${claz('vv-dialog-header')} {
    padding: 10px 24px;
    font-size: 16px;
    color: #333;
    line-height: 30px;
    font-weight: bold;
    border-bottom: 1px solid #e9e9e9;
}
.${claz('vv-dialog-header')},
.${claz('vv-dialog-body')} {
    padding: 24px;
}
.${claz('vv-dialog-body')} {
    font-size: 14px;
    color: #333;
}
.${claz('vv-dialog-footer')} {
    border-top: 1px solid #e9e9e9;
    padding: 10px 24px;
    text-align: center;
}
.${claz('vv-dialog-footer')} button {
    color: #fff;
    line-height: 30px;
    border: none;
    border-radius: 5px;
    padding: 0 20px;
    margin: 0 5px;
    cursor: pointer;
    background-color: #5aadf9;
    box-sizing: border-box;
    transition: background-color 0.3s;
}
.${claz('vv-dialog-footer')} button:hover {
    background-color: #349bfa;
}
.${claz('vv-dialog-footer')} button:first-child {
    color: #333;
    border-color: #fff;
    background-color: #fff;
}
    `);
}
