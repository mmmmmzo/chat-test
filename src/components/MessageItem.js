import React, { useEffect, useRef } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, makeStyles, Divider } from '@material-ui/core';
import { gravatarPath } from "../gravatar";

const useStyles = makeStyles(() => ({
    inline: {
        background: 'white',
    },
}));

const MessageItem = ({ isLastItem, name, text }) => {
    const ref = useRef(null);
    const classes = useStyles();
    const avatarPath = gravatarPath(name);

    useEffect(() => {
        if (isLastItem) {
            // ここでスクロールする
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isLastItem]);
    return (
        <div>
            <ListItem ref={ref}>
                <ListItemAvatar>
                    <Avatar src={avatarPath} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="primary"
                            className={classes.inline}
                        >
                            {text}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    )
};

export default MessageItem;