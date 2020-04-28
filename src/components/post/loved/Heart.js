import React from 'react'
import { HeartTwoTone } from '@ant-design/icons'


function Heart(props) {
    return (
        <HeartTwoTone
            twoToneColor={props.loved ? "red" : "#ccc"}
            key="heart"
            onClick={props.handleClick}
        />
    )
}

export default Heart