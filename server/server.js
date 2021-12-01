const compression = require("compression");
const express = require("express");
const getItems = require("./components/getItems");
const sendCart = require("./components/sendCart");
const db = require("./db/queries");
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
app.post("/api/createAccount", db.createAccount);
app.post("/api/login", db.login);

// Error handler
app.use(function (err, req, res, next) {
    // All errors from non-async route above will be handled here
    res.status(500).send(err.message);
});

//start the server
app.listen(port, () => {
    console.log(`Bortik project app listening at port ${port}`);
});
