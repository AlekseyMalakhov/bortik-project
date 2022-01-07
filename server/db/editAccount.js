const pool = require("./pool");

const editAccount = async (req, res) => {
    const id = req.params.id;
    const { name, email, password, phone, address, newPassword } = req.body;

    try {
        const query1 = {
            text: "SELECT password FROM users WHERE id = $1",
            values: [id],
        };
        const response1 = await pool.query(query1);
        const userPassword = response1.rows[0].password;
        if (userPassword !== password) {
            return res.status(401).send("Invalid password.");
        }

        let query;
        if (newPassword) {
            query = {
                text: "UPDATE users SET name = ($1), email = ($2), phone = ($3), address = ($4), password = ($6) WHERE id = ($5) RETURNING id",
                values: [name, email, phone, address, id, newPassword],
            };
        } else {
            query = {
                text: "UPDATE users SET name = ($1), email = ($2), phone = ($3), address = ($4) WHERE id = ($5) RETURNING id",
                values: [name, email, phone, address, id],
            };
        }

        const response = await pool.query(query);
        res.status(200).send(`User with id = ${response.rows[0].id} updated`);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = editAccount;
