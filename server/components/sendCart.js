const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../mail_env/.env" }); //just for dev environment

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

const createHTML = (data) => {
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
