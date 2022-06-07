const pool = require("./pool");

const deleteBarcode = async (req, res) => {
    const id = req.params.id;
    try {
        const query = {
            text: "DELETE FROM barcodes WHERE id = $1",
            values: [id],
        };
        const response = await pool.query(query);
        if (response.rowCount !== 0) {
            res.status(200).send(`Barcode with id = ${id} removed`);
        } else {
            res.status(500).send("Error in delete barcode");
        }
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = deleteBarcode;
