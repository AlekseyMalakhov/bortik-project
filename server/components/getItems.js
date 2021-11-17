const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const generateListOfItems = () => {
    const buf = fs.readFileSync(path.join(__dirname, "..", "import.xlsx"));
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

// const getNumberOfItems = (arr) => {
//     const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//     const numbers = {};
//     for (let i = 0; i < letters.length; i++) {
//         numbers[letters[i]] = [];
//         for (let k = 0; k < arr.length; k++) {
//             const regex = new RegExp(letters[i] + "\\d*");
//             if (regex.test(arr[k].cell)) {
//                 numbers[letters[i]].push(arr[k].cell);
//             }
//         }
//         numbers[letters[i]] = numbers[letters[i]].length;
//     }
//     return numbers;
// };

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
    items: [],
    categories: [],
};

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

    //for (let i = 0; i < numberOfItems.length; i++) {
    for (let i = 0; i < 80; i++) {
        //show only 80 items
        const number = numberOfItems[i];
        if (data[`B${number}`] && data[`C${number}`]) {
            const obj = {
                id: data[`B${number}`].v + "_" + i,
                kategoria: data[`A${number}`].v,
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
            result.items.push(obj);
        }
    }
    result.categories = getCategories(arr);
}

const getItems = (req, res) => {
    if (result.items.length !== 0) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
