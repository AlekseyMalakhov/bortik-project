const pool = require("./pool");

const recalculateSumOfOrder = async (orderID) => {
    const query1 = {
        text: "SELECT items FROM orders WHERE id = ($1)",
        values: [orderID],
    };
    const response1 = await pool.query(query1);
    const items = response1.rows[0].items;
    const arrOfSums = [];
    Promise.all(
        items.map(async (itemID) => {
            const query2 = {
                text: "SELECT sum FROM sold_items WHERE id = ($1)",
                values: [itemID],
            };
            const response2 = await pool.query(query2);
            const sum = response2.rows[0].sum;
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
