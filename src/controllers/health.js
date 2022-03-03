const {Router} = require('express');

// HealthController 控制層負責處理 server 重啟時的 api 接口
// server 重啟時會有短暫一段時間的不可用，在實際 PRD 環境會使用負載均衡將訪問分發到多個應用節點提高可用性。
// 此接口需要提供健康狀態檢測來幫助負載均衡判斷流量去向
class HealthController {
    async init() {
        const router = Router();
        router.get('/', this.get);
        return router;
    }

    get = (req, res) => {
        res.send({});
    };
}

module.exports = async () => {
    const c = new HealthController();
    return await c.init();
};
