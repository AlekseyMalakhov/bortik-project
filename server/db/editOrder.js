const pool = require("./pool");

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
        res.status(200).send(`Order with id = ${response.rows[0].id} updated`);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = editOrder;
