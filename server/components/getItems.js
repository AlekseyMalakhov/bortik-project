const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const groups = {
    "Бумажно-гигиеническая продукция": [
        "Бумажно-гигиеническая продукция",
        "Бумажные полотенца",
        "Бумажные салфетки",
        "Прочая бумажная продукция",
        "Туалетная бумага",
    ],
    "Бытовая химия": [
        "Мыло",
        "Освежители воздуха",
        "Полироль для мебели",
        "Средства для кухни",
        "Средства для мытья пола и стен",
        "Средства для мытья посуды",
        "Средства для очистки стекол и зеркал",
        "Средства для стирки",
        "Средства для туалетов и ванных комнат",
        "Средства для чистки ковров и обивки мебели",
        "Средства для чистки труб",
        "Универсальные чистящие средства",
    ],
    "Диспенсеры и дозаторы для общественных санузлов": ["Диспенсеры для бумажных изделий", "Дозаторы"],
    "Канцелярские товары": ["Офисные кресла", "Художественные товары"],
    "Одноразовая посуда": [
        "Бумажная упаковка",
        "Контейнеры универсальные",
        "Крышки для стаканов",
        "Ланч-боксы",
        "Одноразовые пластиковые стаканы",
        "Палочки для еды",
        "Пластиковые контейнеры-салатники",
        "ПЭТ-стаканы",
        "Размешиватели",
        "Соусники",
        "Стаканы для горячих напитков",
        "Столовые приборы",
        "Суповые банки",
        "Тарелки и миски",
        "Трубочки",
    ],
    "Профессиональная химия, дезсредства": ["Дезсредства", "Профессиональная химия", "Профессиональные моющие средства Тайгета"],
    "Спецодежда и перчатки": ["Одноразовая спецодежда", "Перчатки"],
    "Товары для кухни, общепита и клининга": ["Термометры и гигрометры", "Товары для приготовления еды", "Украшения, сервировка для напитков и еды"],
    "Товары для упаковки и фасовки": ["Пакеты", "Скотчи, клейкие ленты и стрейч", "Хомуты, шпагаты и сетки"],
    "Хозяйственные товары": [
        "Губки и мочалки хозяйственные",
        "Лопаты, грабли, черенки",
        "Метлы, щетки, совки для уборки",
        "Окномойки",
        "Протирочный материал, ветошь",
        "Разное",
        "Тележки для уборки",
        "Товары для туалета",
        "Швабры, мопы, держатели",
    ],
};

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

//
const result1 = {
    items: {},
    groups: {},
};
//

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

    //
    const findGroup = (categoryName) => {
        for (let x in groups) {
            const result = groups[x].find((name) => name === categoryName);
            if (result) {
                return x;
            }
        }
        return "notFound";
    };
    //

    for (let i = 0; i < result.categories.length; i++) {
        const name = result.categories[i].name;
        //
        const group = findGroup(name);
        if (group === "notFound") {
            console.log(name);
        }
        //
        result.items[name] = items.filter((item) => item.category === name);

        //
        // result1.groups[group][name] = items.filter((item) => item.category === name);
        // console.log(result1);
        //
    }
}

const getItems = (req, res) => {
    if (result.items.length !== 0) {
        res.send(result);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
};

module.exports = getItems;
