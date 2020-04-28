import React from 'react'
import ReactMarkdown from 'react-markdown'

function PostDescription(props) {
    return (
        <ReactMarkdown
            style={{ padding: "20px" }}
            source={props.post.description}
        />
    )
}

export default PostDescription