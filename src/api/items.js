import client from "./client";
import i18n from "../i18n";

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

const getTranslationsForUI = () => {
    return client
        .post("/getTranslationsForUI")
        .then((response) => {
            if (response.status === 200) {
                const translations = response.data;
                for (let x in translations) {
                    i18n.addResourceBundle(x, "translation", translations[x]);
                }
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
    getTranslationsForUI,
};

export default itemsAPI;
