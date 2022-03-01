import './moulds/yup.js';

// 把 yup 壓出來的 module 掛上 window 以供後續前端使用
window.require = (k) => {
    console.log('-----------');
    console.log(k);
    return window[k];
};
window.exports = window.moulds = {};
