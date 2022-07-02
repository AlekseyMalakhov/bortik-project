const pool = require("./pool");

const addItemToOrder = async (req, res) => {
    const id = req.params.id;
    const { item, customer_id, date, order_id, price } = req.body;
    try {
        const query1 = {
            text: "INSERT INTO sold_items (article, title, number, price, sum, customer_id, date, price_for_manager, price_exc_vat, price_inc_vat) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
            values: [item.article, item.title.ru, 1, price, price, customer_id, date, item.priceForManager, item.priceExcVAT, item.priceIncVAT],
        };
        const response1 = await pool.query(query1);
        const newItemId = response1.rows[0].id;
        if (newItemId) {
            const query2 = {
                text: "SELECT items, sum FROM orders WHERE id = $1",
                values: [order_id],
            };
            const response2 = await pool.query(query2);
            const newItems = response2.rows[0].items;
            const newSum = Number(response2.rows[0].sum) + price;
            newItems.push(newItemId);

            const query3 = {
                text: "UPDATE orders SET items = ($1), sum = ($2) WHERE id = ($3)",
                values: [newItems, newSum, order_id],
            };
            const response3 = await pool.query(query3);
            if (response3.rowCount !== 0) {
                res.status(200).send(`Order with id = ${order_id} updated`);
            } else {
                res.status(500).send("Error in add item");
            }
        } else {
            res.status(500).send("Error in add item");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = addItemToOrder;
