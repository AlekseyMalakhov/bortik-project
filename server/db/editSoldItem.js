const pool = require("./pool");
const recalculateSumOfOrder = require("./recalculateSumOfOrder");

const editSoldItem = async (req, res) => {
    const id = req.params.id;
    const { article, title, number, price, price_for_manager, sum, orderID } = req.body;
    try {
        const query = {
            text: `UPDATE sold_items SET 
            article = ($1), 
            title = ($2), 
            number = ($3), 
            price = ($4), 
            price_for_manager = ($5), 
            sum = ($6) 
            WHERE id = ($7) 
            RETURNING id`,
            values: [article, title, number, price, price_for_manager, sum, id],
        };
        const response = await pool.query(query);

        //update order sum
        await recalculateSumOfOrder(orderID);
        //end
        res.status(200).send(`Sold item with id = ${response.rows[0].id} updated`);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = editSoldItem;
