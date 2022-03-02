const {Router} = require('express');
const urlNormalizeMiddleware = require('./urlnormalize');

module.exports = async function initMiddlewares() {
    // 路由建立成模組
    const router = Router();

    // 在路由其中載入 middleware
    router.use(urlNormalizeMiddleware());
    return router;
};
