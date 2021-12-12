import client from "./client";

const getItems = () => {
    return client
        .post("/getItems")
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("error");
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const getTranslations = () => {
    return client
        .post("/getTranslations")
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("error");
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const sendCart = (data) => {
    return client
        .post("/sendCart", data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const itemsAPI = {
    getItems,
    sendCart,
    getTranslations,
};

export default itemsAPI;
