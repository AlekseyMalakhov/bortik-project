const Pool = require("pg").Pool;
require("dotenv").config({ path: "../../project_env/.env" }); //just for dev environment

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const createAccountAuto = async (req, res) => {
    const { name, email, phone, address } = req.body.customer;
    const query1 = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    };
    try {
        const response1 = await pool.query(query1);
        const existingUser = response1.rows[0];
        if (!existingUser) {
            const query2 = {
                text: "INSERT INTO users (name, email, password, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING password",
                values: [name, email, "12345", phone, address],
            };
            const response2 = await pool.query(query2);
            return response2.rows[0].password;
        } else {
            return null;
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

const createAccount = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const query1 = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    };
    try {
        const response1 = await pool.query(query1);
        const existingUser = response1.rows[0];
        if (!existingUser) {
            const query2 = {
                text: "INSERT INTO users (name, email, password, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING id",
                values: [name, email, password, phone, address],
            };
            const response2 = await pool.query(query2);
            res.status(201).send(`User added with ID: ${response2.rows[0].id}`);
        } else {
            res.status(409).send("Current email already exists");
            return null;
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

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

const forgotPassword = (req, res) => {
    res.status(200).send("hi");
};

module.exports = {
    createAccountAuto,
    createAccount,
    login,
    forgotPassword,
};
