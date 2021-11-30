const Pool = require("pg").Pool;
require("dotenv").config({ path: "../../project_env/.env" }); //just for dev environment

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const createUser = async (req, res) => {
    const data = req.body;
    console.log(data);
    const query1 = {
        text: "SELECT table_schema,table_name FROM information_schema.tables;",
    };
    try {
        const response1 = await pool.query(query1);
        const existingUser = response1.rows[0];
        console.log(response1.rows);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
    // let img = "";
    // if (req.file) {
    //     img = req.file.transforms[0].location;
    // }
    // const { name, email, password } = JSON.parse(req.body.text);
    // const query1 = {
    //     text: "SELECT * FROM users WHERE email = $1",
    //     values: [email],
    // };
    // try {
    //     const response1 = await pool.query(query1);
    //     const existingUser = response1.rows[0];
    //     if (!existingUser) {
    //         const query2 = {
    //             text: "INSERT INTO users (name, email, password, img) VALUES($1, $2, $3, $4) RETURNING id",
    //             values: [name, email, password, img],
    //         };
    //         pool.query(query2, (error, results) => {
    //             if (error) {
    //                 res.status(500).send(error.detail);
    //                 return;
    //             }
    //             res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    //         });
    //     } else {
    //         res.status(409).send("Current email already exists");
    //     }
    // } catch (error) {
    //     res.status(500).send(error.stack);
    //     console.log(error.stack);
    // }
    res.status(201).send("hi all");
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

module.exports = {
    createUser,
    login,
};
