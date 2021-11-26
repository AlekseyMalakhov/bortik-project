const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../mail_env/.env" });

let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.SECRET,
    },
});

async function run(html, email) {
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
            <td>${i + 1}</td>
            <td>${cart[i].title}</td>
            <td>${cart[i].article}</td>
            <td>${cart[i].number}</td>
            <td>${cart[i].price}</td>
            <td>${cart[i].sum}</td>
        </tr>
        `;
        str = str + row;
    }
    return str;
};

const createHTML = (data) => {
    const part1 = `<p>Заказ в магазине Bortik Project успешно оформлен. Номер заказа 12345</p>
    <style>      
        #bortik_project_table {
            font-family: sans-serif;
            width: 100%;
            border-collapse: collapse;
        }
        #bortik_project_table th,td {
            border: 1px solid black;
            padding: 5px 5px;
        }
    </style>
    <table id="bortik_project_table" >
    <tr>
        <th>Номер</th>
        <th>Наименование товара</th>
        <th>Артикул</th>
        <th>Количество в заказе</th>
        <th>Цена за 1 шт. руб</th>
        <th>Сумма, руб</th>
    </tr>`;
    const part2 = createRows(data.cart);
    const part3 = `<tr style="font-weight: bold;">
            <td colspan="5">Общая сумма</td>
            <td>${data.sum}</td>
        </tr>
        </table>
        <p>Цена: ${data.priceType}</p>
        <p style="font-weight: bold;">Сведения о покупателе:</p>
        <p>ФИО: ${data.customer.name_user}</p>
        <p>Телефон: ${data.customer.phone}</p>
        <p>Email: ${data.customer.email}</p>
        <p>Адрес доставки: ${data.customer.address}</p>
        <p>Комментарий: ${data.customer.comment}</p>
        <p>Способ оплаты: ${data.customer.payment_method}</p>
        <p>Доставка: ${data.customer.delivery}</p>`;
    const htmlStr = part1 + part2 + part3;
    return htmlStr;
};

const sendCart = (req, res) => {
    const data = req.body;
    const html = createHTML(data);
    //console.log(cart);
    run(html, data.customer.email).catch(console.error);
    res.status(200).send("Nice!");
};

module.exports = sendCart;
