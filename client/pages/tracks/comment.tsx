import React from 'react'
import classes from './[id].module.css'
import {Avatar, Card} from '@material-ui/core'

const CommentFC: React.FC<CommentProps> = ({comment}) => {
    return (
            <Card className={classes.comment}>
                <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
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
            </Card>
    )
}

export default CommentFC

type CommentProps={
    comment: any
}