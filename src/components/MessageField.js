import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import { pushMessage } from "../firebase";

const MessageFiled = ({ inputEl, name, setText, text }) => {
    const [isComposed, setIsComposed] = useState(false);
    console.log({ text })
    return <TextField
        autoFocus
        fullWidth
        inputRef={inputEl}
        onChange={(e) => { setText(e.target.value) }}
        onKeyDown={(e) => {
            console.log({ key: e.key });
            if (isComposed) return;

            const text = e.target.value;
            if (text === '') return;
            if (e.key === 'Enter') {
                console.log('push massage to firebase')
                pushMessage({ name, text });
                setText('');
                e.preventDefault();
            }
        }}
        onCompositionStart={() => setIsComposed(true)}
        onCompositionEnd={() => setIsComposed(false)}
        value={text}
    />;
};

export default MessageFiled;