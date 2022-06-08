const pool = require("./pool");

const editBarcode = async (req, res) => {
    const id = req.params.id;
    const { article, barcode } = req.body;
    try {
        const query = {
            text: "UPDATE barcodes SET article = ($1), barcode = ($2) WHERE id = ($3) RETURNING id",
            values: [article, barcode, id],
        };
        const response = await pool.query(query);
        if (response.rowCount !== 0) {
            res.status(200).send(`Barcode with id = ${id} updated`);
        } else {
            res.status(500).send("Error in delete barcode");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = editBarcode;
