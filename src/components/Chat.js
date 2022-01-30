import React, { useEffect } from "react";
import liveChat from "../utilities/liveChat"; //code.tidio.co/7qifmqgpl3o6vnpck6uawogjsbjrhsot.js

function Chat() {
    useEffect(() => {
        liveChat();
    }, []);
    return <div></div>;
}

export default Chat;
