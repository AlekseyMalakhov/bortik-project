const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../project_env/.env" }); //just for dev environment
const db = require("../db/queries");
// const path = require("path");
// const db = require(path.join(__dirname, "..", "db", "queries.js"));

let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.SECRET,
    },
});

async function run(html, email, password) {
    let info = await transporter.sendMail({
        from: '"Bortik Project" <cart@bortikproject.com>',
        to: email,
        subject: "Bortik Project. Заказ №12345",
        text: "Заказ в магазине Bortik Project успешно оформлен. Номер заказа 12345",
        html: html,
    });

    console.log(info);
}

const createRows = (cart) => {
    let str = "";
    for (let i = 0; i < cart.length; i++) {
        const row = `
        <tr>
            <td style="border: 1px solid black; padding: 5px 5px;">${i + 1}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].title}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].article}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].number}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].price}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].sum}</td>
        </tr>
        `;
        str = str + row;
    }
    return str;
};

const createHTML = (data, password) => {
    const part1 = `<p>Заказ в магазине Bortik Project успешно оформлен. Номер заказа 12345</p>
    <table style="font-family: sans-serif; width: 100%; border-collapse: collapse;">
    <tr>
        <th style="border: 1px solid black; padding: 5px 5px;">Номер</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Наименование товара</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Артикул</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Количество в заказе</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Цена за 1 шт. руб</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Сумма, руб</th>
    </tr>`;
    const part2 = createRows(data.cart);
    const part3 = `<tr style="font-weight: bold;">
            <td colspan="5" style="border: 1px solid black; padding: 5px 5px;">Общая сумма</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${data.sum}</td>
        </tr>
        </table>
        <p>Цена: ${data.priceType}</p>
        <p style="font-weight: bold;">Сведения о покупателе:</p>
        <p>ФИО: ${data.customer.name}</p>
        <p>Телефон: ${data.customer.phone}</p>
        <p>Email: ${data.customer.email}</p>
        <p>Адрес доставки: ${data.customer.address}</p>
        <p>Комментарий: ${data.customer.comment}</p>
        <p>Способ оплаты: ${data.customer.payment_method}</p>
        <p>Доставка: ${data.customer.delivery}</p>`;
    const part4 = password
        ? `
    <p>Просмотреть историю заказов Вы можете в Личном кабинете</p>
    <p>Login: ${data.customer.email}</p>
    <p>Password: ${password}</p>
    `
        : "";
    const htmlStr = part1 + part2 + part3 + part4;
    return htmlStr;
};

const sendCart = async (req, res) => {
    const data = req.body;
    const password = await db.createUserAuto(req, res);
    const html = createHTML(data, password);
    run(html, data.customer.email)
        .then(() => {
            res.status(200).send(html);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

module.exports = sendCart;
