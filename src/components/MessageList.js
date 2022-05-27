import React, { useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { messagesRef } from '../firebase';
import MessageItem from './MessageItem';
const useStyles = makeStyles({
    root: {
        gridRow: 1,
        width: '100%',
        overflow: 'auto',
    },
})

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const classes = useStyles();

    // useEffect -> 無限ループ回避で第二引数に空配列を渡す
    useEffect(() => {
        console.log('check');
        // key: "-N2zY80mtLmUPw7k--NZ",value: {name: 'たろう', text: '111'} とデータが来るので
        // {key: "-N2zY80mtLmUPw7k--NZ",name: 'たろう',text: '111'} に整える
        messagesRef.orderByKey().limitToLast(8).on('value', (snapshot) => {
            const messages = snapshot.val();
            if (messages === null) return;

            const entries = Object.entries(messages);
            const newMessages = entries.map((entry) => {
                const [key, nameAndText] = entry;
                return { key, ...nameAndText };
            });
            setMessages(newMessages);
        });
    }, []);

    const length = messages.length;

    return (
        <List className={classes.root}>
            {messages.map(({ key, name, text }, i) => {
                console.log(messages, i, 'map')
                const isLastItem = length === i + 1;
                return <MessageItem
                    key={key}
                    name={name}
                    text={text}
                    isLastItem={isLastItem}
                />;
            })}
        </List>
    );
};

export default MessageList;
