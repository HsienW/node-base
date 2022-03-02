const {normalize} = require('path');
const {parse, format} = require('url');

// 處理路徑重新定向的中間層
module.exports = function urlNormalizeMiddleware() {
    // 每個 express middleware 基本接受三個參數 req, res, next
    return (req, res, next) => {
        // 處理掉 windows、Linux 使用 normalize 的路徑的分隔符號不同的問題
        const pathname = normalize(req.path).split('\\').join('/');
        const urlParsed = parse(req.url);

        let shouldRedirect = false;

        // 重新定向不在規範的路徑
        if (req.path !== pathname) {
            urlParsed.pathname = pathname;
            shouldRedirect = true;
        }

        // 檢查是否需要執行重新定向
        if (shouldRedirect) {
            res.redirect(format(urlParsed));
        } else {
            next();
        }
    };
};
