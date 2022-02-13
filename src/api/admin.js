import client from "./client";

const loginAdmin = (data) => {
    return client
        .post("/loginAdmin", data)
        .then((response) => {
            return response;
        })
        .catch((error) => error.response);
};

const adminAPI = {
    loginAdmin,
};

export default adminAPI;
