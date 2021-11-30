import client from "./client";

const createAccount = (data) => {
    return client
        .post("/createAccount", data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const login = (data) => {
    return client
        .post("/login", data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const userAPI = {
    createAccount,
    login,
};

export default userAPI;
