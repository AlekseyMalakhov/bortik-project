const pool = require("./pool");

const addItemToOrder = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const { item, customer_id, date, order_id } = req.body;
    try {
        const query1 = {
            text: "INSERT INTO sold_items (article, title, number, price, sum, customer_id, date, price_for_manager) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
            values: [item.article, item.title.ru, 1, item.priceExcVAT, item.priceExcVAT, customer_id, date, item.priceForManager],
        };
        const response1 = await pool.query(query1);
        const newItemId = response1.rows[0].id;
        if (newItemId) {
            const query2 = {
                text: "SELECT items FROM orders WHERE id = $1",
                values: [order_id],
            };
            const response2 = await pool.query(query2);
            const newItems = response2.rows[0].items;
            newItems.push(newItemId);
            console.log(newItems);

            const query3 = {
                text: "UPDATE orders SET items = ($1) WHERE id = ($2)",
                values: [newItems, order_id],
            };
            const response3 = await pool.query(query3);
            console.log(response3);
            res.status(200).send(`Order with id = ${order_id} updated`);
        } else {
            res.status(500).send(error.stack);
            console.log(error.stack);
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = addItemToOrder;
