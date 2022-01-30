const createRows = (cart) => {
    let str = "";
    for (let i = 0; i < cart.length; i++) {
        const row = `
        <tr>
            <td style="border: 1px solid black; padding: 5px 5px;"></td>
            <td style="border: 1px solid black; padding: 5px 5px;"></td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].article}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].title}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].number}</td>
            <td style="border: 1px solid black; padding: 5px 5px;">${cart[i].priceForManager}</td>
        </tr>
        `;
        str = str + row;
    }
    return str;
};

const createLetterForManager = (data, newUser, orderId) => {
    const part1 = `<p>Номер заказа ${orderId}</p>
    <table style="font-family: sans-serif; width: 100%; border-collapse: collapse;">
    <tr>
        <th style="border: 1px solid black; padding: 5px 5px;">Штрихкод</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Код</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Артикул</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Номенклатура</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Количество</th>
        <th style="border: 1px solid black; padding: 5px 5px;">Цена</th>
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

    const htmlStr = part1 + part2 + part3;
    return htmlStr;
};

module.exports = createLetterForManager;
