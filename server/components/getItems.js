const axios = require("axios");
const XLSX = require("xlsx");
const groupsFile = require("../groups");
const translations = require("./getItemNamesTranslations");

const getData = () => {
    axios
        .get("https://smartikon.by/public/import/import.xlsx", { responseType: "arraybuffer" })
        .then((response) => {
            const workbook = XLSX.read(response.data, { type: "buffer" });
            createItemsData(workbook);
        })
        .catch((err) => console.log(err));
};

getData();
setInterval(getData, 300000); //every 5 min update

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

const resultItems = {};

function createItemsData(workbook) {
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
                const key = data[`C${number}`].v;

                //check
                if (!(key in translations.ru)) {
                    console.log(key);
                }
                if (!(key in translations.zh)) {
                    //console.log(key);
                }
                if (!(key in translations.en)) {
                    //console.log(key);
                }
                //end check
                const price = data[`G${number}`].v;
                const obj = {
                    id: data[`B${number}`].v + "_" + i,
                    category2: data[`A${number}`].v,
                    article: data[`B${number}`].v,
                    title: {
                        ru: translations.ru[key] ? translations.ru[key] : key,
                        zh: translations.zh[key] ? translations.zh[key] : key,
                        en: translations.en[key] ? translations.en[key] : key,
                    },
                    presence: data[`D${number}`] ? data[`D${number}`].v : 0,
                    unit: data[`E${number}`].v,
                    img: data[`F${number}`] ? "https://smartikon.by/uploads/" + data[`F${number}`].v : "",
                    priceExcVAT: price,
                    priceIncVAT: Math.round((price * 1.2 + Number.EPSILON) * 100) / 100,
                    priceForManager: price,
                    discount: data[`J${number}`] ? data[`J${number}`].v : null,
                    selected: true,
                };
                items.push(obj);
            }
        }

        //Math.round( ( price * 1.2 + Number.EPSILON ) * 100 ) / 100

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

            //handle units
            if (item.unit === "тыс. шт/1000 шт") {
                const regex = /(\d+)\sшт/;
                const found = item.title.ru.match(regex);
                if (found && found[1]) {
                    //console.log(item.title.ru + " штуки штуки");
                    //console.log(found[1]);
                    const newPrice = (item.priceExcVAT / 1000) * found[1];
                    item.priceExcVAT = Math.ceil((newPrice + Number.EPSILON) * 100) / 100;
                    item.priceIncVAT = Math.ceil((newPrice * 1.2 + Number.EPSILON) * 100) / 100;

                    //console.log(newPrice);
                    //console.log(item.priceExcVAT);
                }
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

    resultItems.items = items;
    resultItems.catalog = catalog;
}

const getItems = (req, res) => {
    if (resultItems.items.length !== 0) {
        res.send(resultItems);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
