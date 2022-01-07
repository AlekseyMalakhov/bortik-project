const pool = require("./pool");

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

module.exports = createAccount;
