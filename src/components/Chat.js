import React, { useEffect } from "react";
import styled from "@emotion/styled";
import liveChat from "../utilities/liveChat";

const ChatStyled = styled.div({});

function Chat() {
    useEffect(() => {
        (function () {
            function onTidioChatApiReady() {
                const iframe = document.getElementById("tidio-chat-iframe");
                var style = document.createElement("style");
                style.type = "text/css";
                style.innerHTML = `.start-group .h2-banner { font-size: 24px; margin-top: 0; margin-bottom: 0; line-height: normal;}
                              button.material-icons.exit-chat, label.material-icons.exit-chat {margin: 0 0;}
                              .project-online button.material-icons.exit-chat, label.material-icons.exit-chat {margin: 15px -3px 8px 11px;}
                              .mobile .project-online button.material-icons.exit-chat, label.material-icons.exit-chat {margin: 5px -13px -2px 1px; padding: 10px}
                              #button.chat-closed {display: none}
                              #button .chat-closed {display: none}`;
                iframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(style);
            }
            if (window.tidioChatApi) {
                window.tidioChatApi.on("ready", onTidioChatApiReady);
            } else {
                document.addEventListener("tidioChat-ready", onTidioChatApiReady);
            }
        })();
        liveChat();
        window.tidioChatApi.open();
        console.log(window.tidioChatApi);
    }, []);
    return <ChatStyled></ChatStyled>;
}

export default Chat;
