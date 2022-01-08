const pool = require("./pool");

const addAddress = async (req, res) => {
    const id = req.params.id;
    const { address } = req.body;

    try {
        const query = {
            text: "UPDATE users SET address = ($1) WHERE id = ($2) RETURNING id",
            values: [address, id],
        };
        const response = await pool.query(query);
        res.status(200).send(`User with id = ${response.rows[0].id} updated`);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = addAddress;
