const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const generateListOfItems = () => {
    const buf = fs.readFileSync(path.join(__dirname, "..", "translations_for_ui.xlsx"));
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

const workbook = generateListOfItems();
const data = workbook.Sheets.Лист1;

const data2 = {};
const regex = new RegExp("[A-Z]\\d*");
for (let x in data) {
    if (regex.test(x)) {
        data2[x] = data[x];
    }
}

const regex2 = new RegExp("A\\d*");
let numberOfRows = 0;
for (let x in data2) {
    if (regex2.test(x)) {
        numberOfRows++;
    }
}

const ru = {};
const zh = {};
const en = {};

console.log(numberOfRows);
for (let i = 2; i < numberOfRows + 1; i++) {
    ru[data2[`A${i}`].v] = data2[`B${i}`].v;
    zh[data2[`A${i}`].v] = data2[`C${i}`].v;
    en[data2[`A${i}`].v] = data2[`D${i}`].v;
}

const result = {
    ru,
    zh,
    en,
};

// console.log(ru);
//console.log(data);
//console.log(zh["Дата"]);
// console.log(en);

const getTranslationsForUI = (req, res) => {
    if (result) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getTranslationsForUI;
