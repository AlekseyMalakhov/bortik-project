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

const createLetterForClient = (data, newUser, orderId) => {
    const part1 = `<p>Благодарим за покупку!</p>
    <p>Заказ в магазине 5a.by успешно оформлен. Номер заказа ${orderId}</p>
    <table style="font-family: sans-serif; width: 100%; border-collapse: collapse;">
    <tr>
        <th style="border: 1px solid black; padding: 5px 5px;">Номер</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Наименование товара</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Артикул</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Количество в заказе</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Цена за 1 шт. BYN</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Сумма, BYN</th>
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
    const part4 = newUser
        ? `
    <p>Просмотреть историю заказов Вы можете в Личном кабинете</p>
    <p>Login: ${data.customer.email}</p>
    <p>Password: ${newUser.password}</p>
    `
        : "";
    const part5 = `
        <br>
        <br>
        <div>С уважением,</div>
        <div>Служба поддержки 5a.by</div>`;
    const htmlStr = part1 + part2 + part3 + part4 + part5;
    return htmlStr;
};

module.exports = createLetterForClient;
