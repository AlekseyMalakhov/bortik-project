const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3010;
const cors = require("cors");
app.use(cors());
app.use(express.json());

//only for production build
app.use(express.static(__dirname + "/build"));

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
});
//end for production build

const generateListOfItems = () => {
    const buf = fs.readFileSync("import.xlsx");
    const list = XLSX.read(buf, { type: "buffer" });
    return list;
};

app.post("/api/getItems", (req, res) => {
    const workbook = generateListOfItems();

    const arr = [];
    const data = workbook.Sheets.TDSheet;
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
        res.send(arr);
    } else {
        res.status(500).send("Server error - please contact administrator");
    }
});

//start the server
app.listen(port, () => {
    console.log(`Bortik project app listening at port ${port}`);
});
