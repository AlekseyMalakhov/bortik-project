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
            if (response.status === 200) {
                return response.data;
            }
            return null;
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

const deleteOrder = (orderId) => {
    return client
        .delete("/deleteOrder/" + orderId)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const editOrder = (data, orderId) => {
    return client
        .put("/editOrder/" + orderId, data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const addItemToOrder = (data, orderId) => {
    return client
        .put("/addItemToOrder/" + orderId, data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const addBarcode = (data) => {
    return client
        .post("/addBarcode", data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const getBarcodes = () => {
    return client
        .post("/getBarcodes")
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return null;
        })
        .catch((error) => error.response);
};

const adminAPI = {
    loginAdmin,
    getOrders,
    editSoldItem,
    deleteSoldItem,
    deleteOrder,
    editOrder,
    addItemToOrder,
    addBarcode,
    getBarcodes,
};

export default adminAPI;
