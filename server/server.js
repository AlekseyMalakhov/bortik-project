const compression = require("compression");
const express = require("express");
const getItems = require("./components/getItems");
const getTranslationsForUI = require("./components/getTranslationsForUI");
const sendCart = require("./components/sendCart");
const createAccount = require("./db/createAccount");
const editAccount = require("./db/editAccount");
const login = require("./db/login");
const loginAdmin = require("./db/loginAdmin");
const forgotPassword = require("./db/forgotPassword");
const getHistory = require("./db/getHistory");
const addAddress = require("./db/addAddress");
const getAdminOrders = require("./db/getAdminOrders");
const editSoldItem = require("./db/editSoldItem");
const deleteSoldItem = require("./db/deleteSoldItem");
const deleteOrder = require("./db/deleteOrder");
const editOrder = require("./db/editOrder");
const addItemToOrder = require("./db/addItemToOrder");
const addBarcode = require("./db/addBarcode");
const getBarcodes = require("./db/getBarcodes");
const deleteBarcode = require("./db/deleteBarcode");

const app = express();
const port = process.env.PORT || 3010;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(compression());

//only for production build
app.use(express.static(__dirname + "/build"));

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
});
//end for production build

app.post("/api/getItems", getItems);
app.post("/api/sendCart", sendCart);
app.post("/api/createAccount", createAccount);
app.put("/api/editAccount/:id", editAccount);
app.post("/api/login", login);
app.post("/api/loginAdmin", loginAdmin);
app.post("/api/forgotPassword", forgotPassword);
app.post("/api/getHistory", getHistory);
app.post("/api/getTranslationsForUI", getTranslationsForUI);
app.put("/api/addAddress/:id", addAddress);
app.post("/api/getAdminOrders", getAdminOrders);
app.put("/api/editSoldItem/:id", editSoldItem);
app.delete("/api/deleteSoldItem/:order_id/:id", deleteSoldItem);
app.delete("/api/deleteOrder/:id", deleteOrder);
app.put("/api/editOrder/:id", editOrder);
app.put("/api/addItemToOrder/:id", addItemToOrder);
app.post("/api/addBarcode", addBarcode);
app.post("/api/getBarcodes", getBarcodes);
app.delete("/api/deleteBarcode/:id", deleteBarcode);

// Error handler
app.use(function (err, req, res, next) {
    // All errors from non-async route above will be handled here
    res.status(500).send(err.message);
});

//start the server
app.listen(port, () => {
    console.log(`Bortik project app listening at port ${port}`);
});
