import client from "./client";

const loginAdmin = (data) => {
    return client
        .post("/loginAdmin", data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const getOrders = () => {
    return client
        .post("/getAdminOrders")
        .then((response) => {
            return response.data;
        })
        .catch((error) => error.response);
};

const editSoldItem = (data, itemId) => {
    return client
        .put("/editSoldItem/" + itemId, data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const deleteSoldItem = (orderId, itemId) => {
    return client
        .delete("/deleteSoldItem/" + orderId + "/" + itemId)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const adminAPI = {
    loginAdmin,
    getOrders,
    editSoldItem,
    deleteSoldItem,
};

export default adminAPI;
