const pool = require("./pool");
const format = require("pg-format");

const createOrder = async (req, res, userID) => {
    const { cart, date, priceType, sum, customer } = req.body;

    const arrData = [];
    for (let i = 0; i < cart.length; i++) {
      
        const item = [];
        item.push(cart[i].article);
        item.push(cart[i].title);
        item.push(cart[i].number);
        item.push(cart[i].price);
        item.push(cart[i].sum);
        item.push(userID);
        item.push(date);
        item.push(cart[i].priceForManager);
        arrData.push(item);
    }

    try {
        const sql = format(
            "INSERT INTO sold_items (article, title, number, price, sum, customer_id, date, price_for_manager) VALUES %L RETURNING id",
            arrData
        );
        const response = await pool.query(sql);
        if (response.rows.length > 0) {
            const arrOfItemsId = response.rows.map((item) => item.id);
            

            const query2 = {
                text: "INSERT INTO orders (customer_id, date, price_type, items, sum, address) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
                values: [userID, date, priceType, arrOfItemsId, sum, customer.address],
            };
            
            const response2 = await pool.query(query2);
            
            return response2.rows[0].id;
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = createOrder;
