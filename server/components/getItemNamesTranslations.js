const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const CyrillicToTranslit = require("cyrillic-to-translit-js");
const cyrillicToTranslit = new CyrillicToTranslit();

const generateListOfItems = () => {
    const buf = fs.readFileSync(path.join(__dirname, "..", "translations_items.xlsx"));
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

const workbook = generateListOfItems();
const data = workbook.Sheets.Лист1;

//console.log(workbook.Sheets.Лист1);

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

for (let i = 2; i < numberOfRows; i++) {
    // const key1 = cyrillicToTranslit.transform(data2[`A${i}`].v).toLowerCase();
    // const key = key1.replace(/\s/g, "");
    const key = data2[`A${i}`].v;
    ru[key] = data2[`B${i}`].v;
    zh[key] = data2[`C${i}`].v;
    en[key] = data2[`D${i}`].v;
}

const result = {
    ru,
    zh,
    en,
};

//console.log(ru);
//console.log(zh);
// console.log(en);

module.exports = result;
