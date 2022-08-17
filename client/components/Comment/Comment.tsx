import React from 'react'
import classes from '../../pages/tracks/[id].module.css'
import {Avatar} from '@material-ui/core'

const CommentFC: React.FC<CommentProps> = ({comment}) => {
    return (
            <div className={classes.comment}>
                <Avatar alt="Remy Sharp" src={comment.image}  style={{backgroundColor: comment.color || 'gray'}}>
                    {comment.name.substring(0,1)}
                </Avatar>
                <div className={classes.comment_author}>
                    {comment.name}
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
    comment: {
        name: string
        color: string
        text: string
        image: string
    }
}
