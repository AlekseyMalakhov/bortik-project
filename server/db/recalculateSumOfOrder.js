const pool = require("./pool");

const recalculateSumOfOrder = async (orderID) => {
    const query1 = {
        text: "SELECT items, price_type FROM orders WHERE id = ($1)",
        values: [orderID],
    };
    const response1 = await pool.query(query1);
    const items = response1.rows[0].items;
    const priceType = response1.rows[0].price_type;
    const arrOfSums = [];
    return Promise.all(
        items.map(async (itemID) => {
            const query2 = {
                text: "SELECT number, price_exc_vat, price_inc_vat FROM sold_items WHERE id = ($1)",
                values: [itemID],
            };
            const response2 = await pool.query(query2);
            const number = response2.rows[0].number;
            const price_exc_vat = response2.rows[0].price_exc_vat;
            const price_inc_vat = response2.rows[0].price_inc_vat;
            let sum;
            if (priceType === "с НДС") {
                sum = price_inc_vat * number;
            }
            if (priceType === "без НДС") {
                sum = price_exc_vat * number;
            }
            arrOfSums.push(sum);
        })
    ).then(async () => {
        const totalSum = arrOfSums.reduce((prev, next) => Number(prev) + Number(next));
        console.log(totalSum);
        const query3 = {
            text: "UPDATE orders SET sum = ($1) WHERE id = ($2) RETURNING id",
            values: [totalSum, orderID],
        };
        const response3 = await pool.query(query3);
        return response3.rows[0].id;
    });
};

module.exports = recalculateSumOfOrder;
