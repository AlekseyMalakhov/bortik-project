import client from "./client";

const createAccount = (data) => {
    return client
        .post("/createAccount", data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const editAccount = (data, userId) => {
    return client
        .put("/editAccount/" + userId, data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const login = (data) => {
    return client
        .post("/login", data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const forgotPassword = (email) => {
    return client
        .post("/forgotPassword", email)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const getHistory = (userID) => {
    return client
        .post("/getHistory", userID)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const userAPI = {
    createAccount,
    login,
    forgotPassword,
    editAccount,
    getHistory,
};

export default userAPI;
