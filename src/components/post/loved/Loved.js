import React, { useState } from 'react'
import { Space } from 'antd'
import _ from 'lodash'

import Heart from './Heart'
import ByWhom from './ByWhom'

function Loved(props) {
    const [loved, setLoved] = useState(false)
    const [lovedBy, setLovedBy] = useState([])

    const handleClick = () => {
        if (lovedBy.includes(props.user)) {
            setLoved(false)
            setLovedBy(_.filter(lovedBy, (n) => n != props.user))
        } else {
            setLoved(true)
            setLovedBy([
                ...lovedBy,
                props.user
            ])
        }
    }

    return (
        <Space>
            <Heart loved={loved} handleClick={handleClick} />
            <ByWhom lovedBy={lovedBy} user={props.user} />
        </Space>
    )
}

export default Loved