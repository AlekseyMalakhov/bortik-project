require("dotenv").config({ path: "../../project_env/.env" }); //just for dev environment
const format = require("pg-format");
const translations = require("../components/getItemNamesTranslations");
const pool = require("./pool");

const createAccountAuto = require("./createAccountAuto");
const createAccount = require("./createAccount");
const editAccount = require("./editAccount");
const login = require("./login");
const forgotPassword = require("./forgotPassword");

const createOrder = async (req, res, userID) => {
    const { cart, date, priceType, sum } = req.body;

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
        arrData.push(item);
    }

    try {
        const sql = format("INSERT INTO sold_items (article, title, number, price, sum, customer_id, date) VALUES %L RETURNING id", arrData);
        const response = await pool.query(sql);
        if (response.rows.length > 0) {
            const arrOfItemsId = response.rows.map((item) => item.id);
            console.log(arrOfItemsId);

            const query2 = {
                text: "INSERT INTO orders (customer_id, date, price_type, items, sum) VALUES($1, $2, $3, $4, $5) RETURNING id",
                values: [userID, date, priceType, arrOfItemsId, sum],
            };
            const response2 = await pool.query(query2);
            return response2.rows[0].id;
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

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

module.exports = {
    createAccountAuto,
    createAccount,
    login,
    forgotPassword,
    editAccount,
    createOrder,
    getHistory,
};
