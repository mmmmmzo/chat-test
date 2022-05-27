import React from "react";
import { pushMessage } from '../firebase';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const MessageSubmitButton = ({ inputEl, name, setText, text }) => {
    return (
        <IconButton
            disabled={text === ""}
            onClick={() => {
                pushMessage({ name, text });
                setText('');
                inputEl.current.focus();
            }}
            aria-label="Send"
        >
            <SendIcon />
        </IconButton>
    );
};

export default MessageSubmitButton;