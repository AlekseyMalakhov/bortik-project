import client from "./client";

const createAccount = (data) => {
    return client
        .post("/createAccount", data)
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

const userAPI = {
    createAccount,
    login,
};

export default userAPI;
