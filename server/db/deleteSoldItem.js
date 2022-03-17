const pool = require("./pool");

const deleteSoldItem = async (req, res) => {
    const id = req.params.id;
    const order_id = req.params.order_id;
    try {
        const query1 = {
            text: "DELETE FROM sold_items WHERE id = $1",
            values: [id],
        };
        const response = await pool.query(query1);
        if (response.rowCount !== 0) {
            const query2 = {
                text: "SELECT * FROM orders WHERE id = $1",
                values: [order_id],
            };
            const response2 = await pool.query(query2);
            if (response2.rowCount !== 0) {
                const items = response2.rows[0].items;
                const newItems = items.filter((item) => item !== parseInt(id));
                const query3 = {
                    text: "UPDATE orders SET items = ($1) WHERE id = ($2)",
                    values: [newItems, order_id],
                };
                const response3 = await pool.query(query3);
                if (response3.rowCount !== 0) {
                    res.status(200).send(`Sold item with id = ${id} removed`);
                } else {
                    res.status(500).send("Error in update order");
                }
            } else {
                res.status(404).send("Order not found");
            }
        } else {
            res.status(404).send("Item not found");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = deleteSoldItem;
