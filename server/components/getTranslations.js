const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const generateListOfItems = () => {
    const buf = fs.readFileSync(path.join(__dirname, "..", "translations.xlsx"));
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

const workbook = generateListOfItems();
const data = workbook.Sheets.Sheet1;

const getTranslations = (req, res) => {
    if (data) {
        res.send(data);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getTranslations;
