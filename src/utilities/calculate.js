export const calculateSum = (cart, priceType) => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let price;
        if (priceType === "с НДС") {
            price = cart[i].priceIncVAT;
        }
        if (priceType === "без НДС") {
            price = cart[i].priceExcVAT;
        }
        sum = sum + price * cart[i].number;
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
