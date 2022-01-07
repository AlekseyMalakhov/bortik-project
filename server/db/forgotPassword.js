const pool = require("./pool");
const transporter = require("../components/nodeMailerClient");

const sendForgottenPassword = async (email, password) => {
    let info = await transporter.sendMail({
        from: '"Bortik Project" <cart@bortikproject.com>',
        to: email,
        subject: "Bortik Project. Восстановление пароля.",
        text: "Ваш пароль успешно восстановлен",
        html: `
        <div>Пароль успешно восстановлен!</div>
        <div>Ваш пароль: ${password}</div>
        <br>
        <br>
        <div>С уважением,</div>
        <div>Служба поддержки Bortik Project</div>
        `,
    });
    console.log(info);
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const query1 = {
        text: "SELECT password FROM users WHERE email = $1",
        values: [email],
    };
    try {
        const response1 = await pool.query(query1);
        const passwordObj = response1.rows[0];
        if (passwordObj) {
            sendForgottenPassword(email, passwordObj.password)
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
