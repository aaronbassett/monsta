import React from 'react'

function UserLink(props) {
    return (
        <a href={`/u/${props.user}`}>@{props.user}</a>
    )
}

export default UserLink