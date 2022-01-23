import client from "./client";

const loadChat = () => {
    return client
        .post("/getChat")
        .then(function (response) {
            // handle success
            //eval(response.data);
            const chat = new Function(response.data);
            chat();
            //response.data();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

export default loadChat;
