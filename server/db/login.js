const pool = require("./pool");

const login = async (req, res) => {
    const { email, password } = req.body;
    const query1 = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    };
    try {
        const response1 = await pool.query(query1);
        const user = response1.rows[0];
        if (!user || user.password !== password) {
            return res.status(401).send("Invalid email or password.");
        }
        const sendUser = { ...user };
        delete sendUser.password;
        // const accessToken = jwt.sign(sendUser, accessTokenSecret, { expiresIn: "1m" });
        // const refreshToken = jwt.sign(sendUser, refreshTokenSecret, { expiresIn: "100m" });
        // const tokens = { accessToken, refreshToken };
        // res.status(200).send(tokens);
        res.status(200).send(sendUser);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = login;
