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

const ru = {
    translation: {},
};
const zh = {
    translation: {},
};
const en = {
    translation: {},
};

for (let i = 2; i < numberOfRows; i++) {
    ru.translation[data2[`A${i}`].v] = data2[`B${i}`].v;
    zh.translation[data2[`A${i}`].v] = data2[`C${i}`].v;
    en.translation[data2[`A${i}`].v] = data2[`D${i}`].v;
}

const result = {
    ru,
    zh,
    en,
};

// console.log(ru);
// console.log(zh);
// console.log(en);

const getTranslations = (req, res) => {
    if (result) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getTranslations;
