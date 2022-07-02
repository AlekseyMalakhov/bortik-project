const pool = require("./pool");
const bcrypt = require("bcrypt");

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // bcrypt.hash(password, 10, async function (err, hash) {
    //     console.log(hash);
    // });

    const query1 = {
        text: "SELECT * FROM admins WHERE email = $1",
        values: [email],
    };
    try {
        const response1 = await pool.query(query1);
        const user = response1.rows[0];

        console.log(user);

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (!result) {
                    return res.status(401).send("Invalid email or password.");
                }
                const sendUser = { ...user };
                delete sendUser.password;
                // const accessToken = jwt.sign(sendUser, accessTokenSecret, { expiresIn: "1m" });
                // const refreshToken = jwt.sign(sendUser, refreshTokenSecret, { expiresIn: "100m" });
                // const tokens = { accessToken, refreshToken };
                // res.status(200).send(tokens);
                res.status(200).send(sendUser);
            });
        } else {
            return res.status(401).send("Invalid email or password.");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = loginAdmin;
