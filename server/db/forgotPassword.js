const pool = require("./pool");
const transporter = require("../components/nodeMailerClient");
const generator = require("generate-password");
const bcrypt = require("bcrypt");

const sendForgottenPassword = async (email, password) => {
    let info = await transporter.sendMail({
        from: '"5a.by" <cart@bortikproject.com>',
        to: email,
        subject: "5a.by. Восстановление пароля.",
        text: "Ваш пароль успешно восстановлен",
        html: `
        <div>Пароль успешно восстановлен!</div>
        <div>Ваш пароль: ${password}</div>
        <br>
        <br>
        <div>С уважением,</div>
        <div>Служба поддержки 5a.by</div>
        `,
    });
    console.log(info);
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const randomPassword = generator.generate({
        length: 10,
        numbers: true,
    });
    const hash = await bcrypt.hash(randomPassword, 10);
    const query1 = {
        text: "UPDATE users SET password = ($1) WHERE email = ($2) RETURNING id",
        values: [hash, email],
    };

    try {
        const response1 = await pool.query(query1);
        const passwordObj = response1.rows[0];
        if (passwordObj) {
            sendForgottenPassword(email, randomPassword)
                .then(() => {
                    res.status(200).send("Mail sent");
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        } else {
            res.status(404).send("Email not found");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = forgotPassword;
