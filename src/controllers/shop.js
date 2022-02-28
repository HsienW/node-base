const {Router} = require('express');
const shopService = require('../services/shop');

// ShopController 控制層負責處理接口的部分, 例如: 處理基本的 api 請求接口
class ShopController {
    shopService;

    async init() {
        this.shopService = await shopService();

        // 透過 router 處理基本的請求模擬
        const router = Router();
        router.get('/', this.getAll);
        router.get('/:shopId', this.getOne);
        router.put('/:shopId', this.put);
        router.delete('/:shopId', this.delete);
        return router;
    }

    getAll = async (req, res) => {
        const {pageIndex, pageSize} = req.query;
        const shopList = await this.shopService.find({pageIndex, pageSize});

        res.send({success: true, data: shopList});
    };

    getOne = async (req, res) => {
        const {shopId} = req.params;
        const shopList = await this.shopService.find({id: shopId});

        if (shopList.length) {
            res.send({success: true, data: shopList[0]});
        } else {
            res.status(404).send({success: false, data: null});
        }
    };

    put = async (req, res) => {
        const {shopId} = req.params;
        const {name} = req.query;
        const shopInfo = await this.shopService.modify({
            id: shopId,
            values: {name},
        });

        if (shopInfo) {
            res.send({success: true, data: shopInfo});
        } else {
            res.status(404).send({success: false, data: null});
        }
    };

    delete = async (req, res) => {
        const {shopId} = req.params;
        const success = await this.shopService.remove({id: shopId});

        if (!success) {
            res.status(404);
        }
        res.send({success});
    };
}

module.exports = async () => {
    const controller = new ShopController();
    return await controller.init();
};
