const compression = require("compression");
const express = require("express");
const getItems = require("./components/getItems");
const getTranslationsForUI = require("./components/getTranslationsForUI");
const sendCart = require("./components/sendCart");
const createAccount = require("./db/createAccount");
const editAccount = require("./db/editAccount");
const login = require("./db/login");
const forgotPassword = require("./db/forgotPassword");
const getHistory = require("./db/getHistory");
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
app.post("/api/forgotPassword", forgotPassword);
app.post("/api/getHistory", getHistory);
app.post("/api/getTranslationsForUI", getTranslationsForUI);

// Error handler
app.use(function (err, req, res, next) {
    // All errors from non-async route above will be handled here
    res.status(500).send(err.message);
});

//start the server
app.listen(port, () => {
    console.log(`Bortik project app listening at port ${port}`);
});
