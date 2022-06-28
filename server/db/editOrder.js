const pool = require("./pool");
//const recalculateSumOfOrder = require("./recalculateSumOfOrder");

const editOrder = async (req, res) => {
    const id = req.params.id;
    const { address, comment, sum, priceType, status } = req.body;
    try {
        const query = {
            text: `UPDATE orders SET 
            address = ($1), 
            comment = ($2), 
            sum = ($3),
            price_type = ($4),
            status = ($5)
            WHERE id = ($6) 
            RETURNING id`,
            values: [address, comment, sum, priceType, status, id],
        };
        const response = await pool.query(query);
        if (response.rowCount !== 0) {
            //await recalculateSumOfOrder(id);
            res.status(200).send(`Order with id = ${response.rows[0].id} updated`);
        } else {
            res.status(500).send("Error in update order");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = editOrder;
