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

module.exports = {
    createUser,
};
