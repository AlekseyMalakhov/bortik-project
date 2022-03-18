const pool = require("./pool");

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const query1 = {
            text: "SELECT items FROM orders WHERE id = $1",
            values: [id],
        };
        const response1 = await pool.query(query1);
        const itemsToDelete = response1.rows[0].items;
        if (response1.rowCount !== 0) {
            const query2 = {
                text: "DELETE FROM sold_items WHERE id = ANY($1)",
                values: [itemsToDelete],
            };
            await pool.query(query2);
            const query3 = {
                text: "DELETE FROM orders WHERE id = $1",
                values: [id],
            };
            const response3 = await pool.query(query3);
            if (response3.rowCount !== 0) {
                res.status(200).send(`Order with id = ${id} removed`);
            } else {
                res.status(500).send("Error in delete order");
            }
        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = deleteOrder;
