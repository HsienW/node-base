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

    async create({values}) {
        await delay();

        // Infinity 是全域物件屬性，即它是全域範圍內的變數。
        // Infinity 的初始值是 Number.POSITIVE_INFINITY (en-US) Infinity 值（正無窮大）值大於其他任何數值。
        // 該值在數學上表現為無窮大。例如，任何乘以 Infinity 的正整數都是 Infinity，除以 Infinity 的任何數都是 0。
        const id = String(
            1 +
            Object.keys(memoryStorage).reduce((m, id) => Math.max(m, id), - Infinity)
        );

        return {id, ...(memoryStorage[id] = values)};
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
