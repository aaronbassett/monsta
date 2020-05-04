import React from 'react'
import { HeartTwoTone } from '@ant-design/icons'

import { useGlobalState } from '../../../state'


function Heart(props) {
    const [state] = useGlobalState()

    return (
        <HeartTwoTone
            twoToneColor={props.loved ? "red" : "#ccc"}
            key="heart"
            onClick={(state.stitch.auth.isLoggedIn) ? props.handleClick : null}
        />
    )
}

export default Heart