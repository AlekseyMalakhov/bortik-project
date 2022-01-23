const axios = require("axios");

const loadChat = () => {
    return axios
        .get("http://code.tidio.co/7qifmqgpl3o6vnpck6uawogjsbjrhsot.js", {
            proxy: {
                host: "localhost",
                port: 5000,
            },
        })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

export default loadChat;
