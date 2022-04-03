const pool = require("./pool");

const getAdminOrders = async (req, res) => {
    const query1 = {
        text: "SELECT * FROM orders",
    };
    try {
        const response1 = await pool.query(query1);
        const history = response1.rows;
        const result = [];
        await Promise.all(
            history.map(async (order) => {
                const query2 = {
                    text: "SELECT * FROM sold_items WHERE id = ANY ($1)",
                    values: [order.items],
                };
                const response2 = await pool.query(query2);
                const items = response2.rows;
                const itemsWithImages = items.map((item) => {
                    item.img = "https://smartikon.by/uploads/" + item.article + ".webp";
                    return item;
                });

                const query3 = {
                    text: "SELECT name, email, phone FROM users WHERE id = $1",
                    values: [order.customer_id],
                };
                const response3 = await pool.query(query3);
                const user = response3.rows[0];

                const newOrder = { ...order };
                newOrder.items = itemsWithImages;
                newOrder.customer = user;
                result.push(newOrder);
            })
        ).then(() => {
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = getAdminOrders;
