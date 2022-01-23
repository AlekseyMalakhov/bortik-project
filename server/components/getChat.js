const axios = require("axios");
const getChat = (req, res) => {
    axios
        .get("http://code.tidio.co/7qifmqgpl3o6vnpck6uawogjsbjrhsot.js")
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => res.status(500).send(err));
};

module.exports = getChat;
