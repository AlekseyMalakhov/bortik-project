const chatURLsettings = {
    dev: "//code.tidio.co/7qifmqgpl3o6vnpck6uawogjsbjrhsot.js",
    prod: "//code.tidio.co/tmjqgyzl1yjyhsmrbksq2bywlpfdblyp.js",
};
const getChatURL = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return chatURLsettings.dev;
    } else {
        return chatURLsettings.dev;
    }

    //for production
    //return chatURL.prod;
};
const chatURL = getChatURL();

export default chatURL;
