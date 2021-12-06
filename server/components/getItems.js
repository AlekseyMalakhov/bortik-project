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
//console.log(catalog);

const generateListOfItems = () => {
    const buf = fs.readFileSync(path.join(__dirname, "..", "import.xlsx"));
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

const getCategories = (arr) => {
    const regex = new RegExp("A\\d*");
    const arr2 = [];
    for (let i = 0; i < arr.length; i++) {
        if (regex.test(arr[i].cell)) {
            if (i !== 0) {
                arr2.push(arr[i].value);
            }
        }
    }
    const uniq = [...new Set(arr2)];
    const result = uniq.map((item, i) => {
        return {
            id: i + 1,
            name: item,
        };
    });
    return result;
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
const result = {
    items: {},
    categories: [],
};

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
        //for (let i = 0; i < 80; i++) {
        //show only 80 items
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
    result.categories = getCategories(arr);

    for (let i = 0; i < result.categories.length; i++) {
        const name = result.categories[i].name;
        result.items[name] = items.filter((item) => item.category === name);
    }

    for (let group in catalog) {
        for (let category1 in catalog[group]) {
            for (let category2 in catalog[group][category1]) {
                console.log(group + " " + category1 + " " + category2);
                catalog[group][category1][category2] = items.filter((item) => item.category === category2);
            }
        }
    }
    result.catalog = catalog;
}

const getItems = (req, res) => {
    if (result.items.length !== 0) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
