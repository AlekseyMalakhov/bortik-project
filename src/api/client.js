import axios from "axios";
import baseURL from "../settings/baseURL";

const client = axios.create({
    baseURL: baseURL,
});

// export let authClient;

// export const createAuthClient = (authToken) => {
//     authClient = axios.create({
//         baseURL: baseURL,
//         headers: {
//             Authorization: "Bearer " + authToken,
//         },
//     });
// };

export default client;
