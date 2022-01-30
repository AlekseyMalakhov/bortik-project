import React, { useEffect } from "react";
import liveChat from "../utilities/liveChat"; //https://widget-v4.tidiochat.com/1_82_0/static/js/render.acd930074e27198d61a1.js

function Chat() {
    useEffect(() => {
        liveChat();
        window.tidioChatApi.open();
    }, []);
    return <div></div>;
}

export default Chat;
