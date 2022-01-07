const pool = require("./pool");
const translations = require("../components/getItemNamesTranslations");

const getHistory = async (req, res) => {
    const { userID } = req.body;
    const query1 = {
        text: "SELECT * FROM orders WHERE customer_id = $1",
        values: [userID],
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
                    const key = item.title;
                    item.img = "https://smartikon.by/uploads/" + item.article + ".webp";
                    item.title = {
                        ru: translations.ru[key] ? translations.ru[key] : key,
                        zh: translations.zh[key] ? translations.zh[key] : key,
                        en: translations.en[key] ? translations.en[key] : key,
                    };
                    return item;
                });
                const newOrder = { ...order };
                newOrder.items = itemsWithImages;
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

module.exports = getHistory;
