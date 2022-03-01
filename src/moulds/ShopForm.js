const Yup = require('yup');

exports.createShopFormSchema = () =>
    Yup.object({
        name: Yup.string()
            .required('商店名不能為空')
            .min(3, '商店名長度至少 3 個字')
            .max(20, '商店名長度不可超過 20 個字')
    });
