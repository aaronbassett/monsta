import React, { useState, useEffect } from 'react'
import { Space } from 'antd'
import _ from 'lodash'
import axios from 'axios'

import { useGlobalState } from '../../../state'
import Heart from './Heart'
import ByWhom from './ByWhom'

function Loved(props) {
    const [state] = useGlobalState()
    const [loved, setLoved] = useState(false)
    const [lovedBy, setLovedBy] = useState([])
    const [initialLoveCount, setInitialLoveCount] = useState(props.post.lovedCount)

    useEffect(() => {
        async function fetchLoved() {
            const response = await axios.get(`${state.server_url}/loved/${props.post._id}`)
            const data = await response.data
            setLovedBy(data)
            if (data.includes(state.currentUser.username)) {
                setLoved(true)
            }
        }
        fetchLoved()
    }, [state.server_url, props.post._id, state.currentUser.username])

    const handleClick = () => {
        if (lovedBy.includes(state.currentUser.username)) {
            setLoved(false)
            setLovedBy(_.filter(lovedBy, (n) => n !== state.currentUser.username))
            setInitialLoveCount(initialLoveCount - 1)
        } else {
            setLoved(true)
            setLovedBy([
                ...lovedBy,
                state.currentUser.username
            ])
            setInitialLoveCount(initialLoveCount + 1)
        }

        async function updateLoved() {
            await axios.put(`${state.server_url}/loved/${props.post._id}`)
        }
        updateLoved()
    }

    return (
        <Space>
            <Heart loved={loved} handleClick={handleClick} />
            <ByWhom lovedBy={lovedBy} initialLoveCount={initialLoveCount} />
        </Space>
    )
}

export default Loved