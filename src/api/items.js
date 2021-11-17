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

const itemsAPI = {
    getItems,
};

export default itemsAPI;
