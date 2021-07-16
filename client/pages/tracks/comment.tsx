import React from 'react'
import classes from './[id].module.css'
import {Avatar, Card} from '@material-ui/core'

const CommentFC: React.FC<CommentProps> = ({comment}) => {
    return (
            <div className={classes.comment}>
                <Avatar alt="Remy Sharp" src={comment.avatar} className={classes.orange}>
                    {comment.username.substring(0,1)}
                </Avatar>
                <div className={classes.comment_author}>
                    {comment.username}
                </div>
                <div
                    className={classes.comment_text}
                >
                    {comment.text}
                </div>
            </div>
    )
}

export default CommentFC

type CommentProps={
    comment: any
}