const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const groupsFile = require("../groups");
const translations = require("./getItemNamesTranslations");

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
            const titleName = data[`C${number}`].v;
            const obj = {
                id: data[`B${number}`].v + "_" + i,
                category2: data[`A${number}`].v,
                article: data[`B${number}`].v,
                title: {
                    ru: translations.ru[titleName],
                    zh: translations.zh[titleName],
                    en: translations.en[titleName],
                },
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

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const catalogInfo = groupsFile.find((info) => info.category2 === item.category2);
        if (catalogInfo) {
            item.category1 = catalogInfo.category1;
            item.group = catalogInfo.group;
        } else {
            item.category1 = "not found";
            item.group = "not found";
        }
    }
}

const catalog = [];
let id = 1;
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const group = item.group;
    const category1 = item.category1;
    const category2 = item.category2;

    let groupIndex = catalog.findIndex((gr) => gr.name === group);
    if (groupIndex === -1) {
        const obj = {
            id,
            name: group,
            items: [],
        };
        catalog.push(obj);
        id++;
    }
    groupIndex = catalog.findIndex((gr) => gr.name === group);
    let category1Index = -1;

    if (groupIndex !== -1) {
        category1Index = catalog[groupIndex].items.findIndex((cat1) => cat1.name === category1);

        if (category1Index === -1) {
            const obj = {
                id,
                name: category1,
                items: [],
            };
            catalog[groupIndex].items.push(obj);
            id++;
        }
        category1Index = catalog[groupIndex].items.findIndex((cat1) => cat1.name === category1);

        let category2Index = -1;

        if (category1Index !== -1) {
            category2Index = catalog[groupIndex].items[category1Index].items.findIndex((cat2) => cat2.name === category2);

            if (category2Index === -1) {
                const obj = {
                    id,
                    name: category2,
                    //items: [],
                };
                catalog[groupIndex].items[category1Index].items.push(obj);
                id++;
            }
        }
    }
}

const result = {
    items: items,
    catalog: catalog,
};

//console.log(translations.zh);

const getItems = (req, res) => {
    if (result.items.length !== 0) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
