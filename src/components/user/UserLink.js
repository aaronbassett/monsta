import React from 'react'

function UserLink(props) {
    return (
        <a href={`/u/${props.userId}`}>{props.username}</a>
    )
}

export default UserLink