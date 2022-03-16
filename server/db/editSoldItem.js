const pool = require("./pool");
const bcrypt = require("bcrypt");

const editSoldItem = async (req, res) => {
    const id = req.params.id;
    try {
        res.status(200).send(`updated`);
    } catch (error) {
        res.status(500).send(error.stack);
        console.log(error.stack);
    }
};

module.exports = editSoldItem;
