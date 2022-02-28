// 模擬的 data
const memoryStorage = {
    '1001': {name: 'AAA'},
    '1002': {name: 'BBB'},
    '1003': {name: 'CCC'},
    '1004': {name: 'DDD'},
};

// 模擬操作的延遲
function delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ShopService 服務層負責處理整個模塊化的邏輯部分, 例如: 基本 data 的 CRUD
class ShopService {
    async init() {
        await delay();
    }

    async find({id, pageIndex = 0, pageSize = 10}) {
        await delay();

        if (id) {
            // Boolean 是一個函數，它會對遍歷數組中的元素，並根據元素的真假類型，對應返回 true 或 false.
            // var a = [1,2,"b",0,{},"",NaN,3,undefined,null,5];
            // var b = a.filter(Boolean); // [1,2,"b",{},3,5]
            // 這樣的寫法是一種簡寫模式, 他相當於
            // b = a.filter(function (x) { return Boolean(x); });
            return [memoryStorage[id]].filter(Boolean);
        }

        return Object.keys(memoryStorage)
            .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
            .map((id) => ({id, ...memoryStorage[id]}));
    }

    async modify({id, values}) {
        await delay();

        const target = memoryStorage[id];

        if (!target) {
            return null;
        }

        return Object.assign(target, values);
    }

    async remove({id}) {
        await delay();

        const target = memoryStorage[id];

        if (!target) {
            return false;
        }

        return delete memoryStorage[id];
    }
}

// 設定成單例
let service;

module.exports = async function () {
    if (!service) {
        service = new ShopService();
        await service.init();
    }
    return service;
};
