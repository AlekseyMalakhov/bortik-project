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

async function run() {
    let info = await transporter.sendMail({
        from: '"Fred Foo" <aleksey.malakhov.eng@gmail.com>',
        to: "hexel@tut.by",
        subject: "Hello",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    });

    console.log(info);
}

const sendCart = (req, res) => {
    run().catch(console.error);
    res.status(200).send("Nice!");
};

module.exports = sendCart;
