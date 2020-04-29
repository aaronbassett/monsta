import React from 'react'
import { HeartTwoTone } from '@ant-design/icons'

import { useGlobalState } from '../../../state'


function Heart(props) {
    const [state] = useGlobalState()

    return (
        <HeartTwoTone
            twoToneColor={props.loved ? "red" : "#ccc"}
            key="heart"
            onClick={(state.currentUser) ? props.handleClick : null}
        />
    )
}

export default Heart