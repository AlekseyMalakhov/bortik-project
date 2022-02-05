const pool = require("./pool");

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
            let addressArr = "[]";
            if (address) {
                const addressObj = [
                    {
                        id: Date.now(),
                        name: address,
                    },
                ];
                addressArr = JSON.stringify(addressObj);
            }
            const query2 = {
                text: "INSERT INTO users (name, email, password, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING *",
                values: [name, email, "12345", phone, addressArr],
            };
            const response2 = await pool.query(query2);
            const newUser = response2.rows[0];
            newUser.new = true;
            return newUser;
        } else {
            return existingUser;
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = createAccountAuto;
