export const calculateSum = (cart, priceType) => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].selected) {
            let price;
            if (priceType === "с НДС") {
                price = cart[i].priceIncVAT;
            }
            if (priceType === "без НДС") {
                price = cart[i].priceExcVAT;
            }
            sum = sum + price * cart[i].number;
        }
    }
    return Number(sum.toFixed(2));
};

export const getPrice = (item, priceType) => {
    if (priceType === "с НДС") {
        return item.priceIncVAT;
    }
    if (priceType === "без НДС") {
        return item.priceExcVAT;
    }
};

export const createDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const result = `${day}.${month}.${year} - ${h}:${m}`;
    return result;
};
