const transporter = require("./nodeMailerClient");
const createAccountAuto = require("../db/createAccountAuto");
const createOrder = require("../db/createOrder");
const createLetterForClient = require("./createLetterForClient");

async function run(htmlForClient, email, orderID) {
    let info = await transporter.sendMail({
        from: '"Bortik Project" <cart@bortikproject.com>',
        to: email,
        subject: "Bortik Project. Заказ №" + orderID,
        text: "Заказ в магазине Bortik Project успешно оформлен. Номер заказа 12345",
        html: htmlForClient,
    });

    console.log(info);
}

const sendCart = async (req, res) => {
    const data = req.body;
    let newUser;
    let userID;
    if (data.customer.id) {
        userID = data.customer.id;
    } else {
        const user = await createAccountAuto(req, res);
        if (user.new) {
            newUser = user;
        }
        userID = user.id;
    }
    const orderID = await createOrder(req, res, userID);
    const htmlForClient = createLetterForClient(data, newUser, orderID);
    run(htmlForClient, data.customer.email, orderID)
        .then(() => {
            res.status(200).send({ orderID });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

module.exports = sendCart;
