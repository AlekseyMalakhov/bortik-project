import client from "./client";

const getItems = () => {
    client
        .post("/getItems")
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
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
