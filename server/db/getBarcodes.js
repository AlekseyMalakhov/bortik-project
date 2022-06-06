const pool = require("./pool");

const getBarcodes = async (req, res) => {
    const query = {
        text: "SELECT * FROM barcodes",
    };
    try {
        const response = await pool.query(query);
        const result = response.rows;
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = getBarcodes;
