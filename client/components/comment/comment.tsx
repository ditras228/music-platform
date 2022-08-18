import React from 'react'
import classes from '../../pages/tracks/[id].module.scss'

const CommentFC: React.FC<CommentProps> = ({comment}) => {
    return (
            <div className={classes.comment}>
                {/*<div alt="Remy Sharp" src={comment.image}  style={{backgroundColor: comment.color || 'gray'}}>*/}
                {/*    {comment.name.substring(0,1)}*/}
                {/*</div>*/}
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
