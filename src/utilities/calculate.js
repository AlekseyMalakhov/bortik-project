export const calculateSum = (cart, priceType) => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let price;
        if (priceType === "с НДС") {
            price = cart[i].price;
        }
        if (priceType === "без НДС") {
            price = cart[i].priceopt;
        }
        if (priceType === "без НДС (от 250р)") {
            price = cart[i].pricemegaopt;
        }
        sum = sum + price * cart[i].number;
    }
    return Number(sum.toFixed(2));
};
