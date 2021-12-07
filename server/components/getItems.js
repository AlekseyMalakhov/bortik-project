const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const groups = require("../groups");

const catalog = {};
for (let i = 0; i < groups.length; i++) {
    const item = groups[i];
    const group = item.group;
    const category1 = item.category1;
    const category2 = item.category2;

    if (!catalog[group]) {
        catalog[group] = {};
    }
    if (!catalog[group][category1]) {
        catalog[group][category1] = {};
    }
    if (!catalog[group][category1][category2]) {
        catalog[group][category1][category2] = [];
    }
}

const generateListOfItems = () => {
    const buf = fs.readFileSync(path.join(__dirname, "..", "import.xlsx"));
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

const getNumbersOfItems = (arr) => {
    const regex = new RegExp("A\\d*");
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (regex.test(arr[i].cell)) {
            const number = Number.parseInt(arr[i].cell.replace("A", ""));
            if (number !== 1) {
                result.push(number);
            }
        }
    }
    return result;
};

const workbook = generateListOfItems();
const data = workbook.Sheets.TDSheet;

const arr = [];
const items = [];

if (data) {
    for (let x in data) {
        if (data[x].v) {
            const obj = {
                cell: x,
                value: data[x].v,
            };
            arr.push(obj);
        }
    }

    const numberOfItems = getNumbersOfItems(arr);

    for (let i = 0; i < numberOfItems.length; i++) {
        const number = numberOfItems[i];
        if (data[`B${number}`] && data[`C${number}`]) {
            const obj = {
                id: data[`B${number}`].v + "_" + i,
                category: data[`A${number}`].v,
                article: data[`B${number}`].v,
                title: data[`C${number}`].v,
                presence: data[`D${number}`] ? data[`D${number}`].v : 0,
                unit: data[`E${number}`].v,
                img: data[`F${number}`] ? "https://smartikon.by/uploads/" + data[`F${number}`].v : "",
                price: data[`G${number}`].v,
                priceopt: data[`H${number}`] ? data[`H${number}`].v : null,
                pricemegaopt: data[`I${number}`] ? data[`I${number}`].v : null,
                discount: data[`J${number}`] ? data[`J${number}`].v : null,
            };
            items.push(obj);
        }
    }

    for (let group in catalog) {
        for (let category1 in catalog[group]) {
            for (let category2 in catalog[group][category1]) {
                catalog[group][category1][category2] = items.filter((item) => item.category === category2);
            }
        }
    }
}

const getItems = (req, res) => {
    const groups = Object.keys(catalog);
    if (groups !== 0) {
        res.send(catalog);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
