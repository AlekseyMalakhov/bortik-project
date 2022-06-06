const pool = require("./pool");

const addBarcode = async (req, res) => {
    const { article, barcode } = req.body;

    try {
        const query = {
            text: "INSERT INTO barcodes (article, barcode) VALUES($1, $2) RETURNING id",
            values: [article, barcode],
        };
        const response = await pool.query(query);
        res.status(200).send({ barcodeID: response.rows[0].id });
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = addBarcode;
