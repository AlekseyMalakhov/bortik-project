const transporter = require("./nodeMailerClient");
const createAccountAuto = require("../db/createAccountAuto");
const createOrder = require("../db/createOrder");
const createLetterForClient = require("./createLetterForClient");
const createLetterForManager = require("./createLetterForManager");

async function run(htmlForClient, htmlForManager, email, orderID) {
    let info = await transporter.sendMail({
        from: '"5a.by" <cart@5a.by>',
        to: email,
        subject: "5a.by. Заказ №" + orderID,
        text: "Заказ в магазине 5a.by успешно оформлен. Номер заказа " + orderID,
        html: htmlForClient,
    });
    console.log(info);

    let info2 = await transporter.sendMail({
        from: '"5a.by" <cart@5a.by>',
        to: "anton@focusqc.com",
        //to: "hexel@tut.by",
        subject: "Заказ №" + orderID,
        text: "Заказ №" + orderID,
        html: htmlForManager,
    });
    console.log(info2);
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
    const htmlForManager = createLetterForManager(data, newUser, orderID);
    run(htmlForClient, htmlForManager, data.customer.email, orderID)
        .then(() => {
            res.status(200).send({ orderID });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

module.exports = sendCart;
