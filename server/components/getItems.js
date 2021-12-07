const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const groupsFile = require("../groups");

const groups = [];
const categories1 = [];
const categories2 = [];

for (let i = 0; i < groupsFile.length; i++) {
    const item = groupsFile[i];

    groups.push(item.group);
    categories1.push(item.category1);
    categories2.push(item.category2);
}

const uniqGroups = [...new Set(groups)];
const uniqCategs1 = [...new Set(categories1)];
const uniqCategs2 = [...new Set(categories2)];

const catalog = {};
for (let i = 0; i < groupsFile.length; i++) {
    const item = groupsFile[i];
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
        catalog[group][category1][category2] = "";
    }
}

const catalog2 = [];
let id = 1;
for (let i = 0; i < groupsFile.length; i++) {
    const item = groupsFile[i];
    const group = item.group;
    const category1 = item.category1;
    const category2 = item.category2;

    let groupIndex = catalog2.findIndex((gr) => gr.name === group);
    console.log(groupIndex);

    if (groupIndex === -1) {
        const obj = {
            id,
            name: group,
            items: [],
        };
        catalog2.push(obj);
        id++;
    }
    groupIndex = catalog2.findIndex((gr) => gr.name === group);
    let category1Index = -1;

    if (groupIndex !== -1) {
        category1Index = catalog2[groupIndex].items.findIndex((cat1) => cat1.name === category1);

        if (category1Index === -1) {
            const obj = {
                id,
                name: category1,
                items: [],
            };
            catalog2[groupIndex].items.push(obj);
            id++;
        }
        category1Index = catalog2[groupIndex].items.findIndex((cat1) => cat1.name === category1);

        let category2Index = -1;

        if (category1Index !== -1) {
            category2Index = catalog2[groupIndex].items[category1Index].items.findIndex((cat2) => cat2.name === category2);

            if (category2Index === -1) {
                const obj = {
                    id,
                    name: category2,
                    //items: [],
                };
                catalog2[groupIndex].items[category1Index].items.push(obj);
                id++;
            }
        }
    }
}
console.log(catalog2);

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
                category2: data[`A${number}`].v,
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

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const catalogInfo = groupsFile.find((info) => info.category2 === item.category2);
        if (catalogInfo) {
            item.category1 = catalogInfo.category1;
            item.group = catalogInfo.group;
        } else {
            item.category1 = "not found";
            item.group = "not found";
            if (!uniqGroups.includes("not found")) {
                uniqGroups.push("not found");
            }
            if (!uniqCategs1.includes("not found")) {
                uniqCategs1.push("not found");
            }
        }
    }
}

//console.log(items);

const result = {
    items: items,
    groups: uniqGroups,
    categories1: uniqCategs1,
    categories2: uniqCategs2,
    catalog,
    catalog2,
};

const getItems = (req, res) => {
    if (result.items.length !== 0) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
