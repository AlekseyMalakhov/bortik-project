const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../project_env/.env" }); //just for dev environment

let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.SECRET,
    },
});

module.exports = transporter;
