const settings = {
    //dev: "http://localhost:3010/api",
    dev: "http://192.168.100.242:3010/api",
    //dev: "http://192.168.100.7:3010/api",
    demo: "https://bortik-project.herokuapp.com/api",
    prod: "https://prod-5a-smartikon.herokuapp.com/api",
};

const getBaseURL = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return settings.dev;
    } else {
        return settings.demo;
    }

    //for production
    //return settings.prod;
};

const baseURL = getBaseURL();

export default baseURL;
