const express = require("express");
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

//start the server
app.listen(port, () => {
    console.log(`Bortik project app listening at port ${port}`);
});
