import React, { useState, useEffect } from 'react'
import { Space } from 'antd'
import axios from 'axios'

import { useGlobalState } from '../../../state'
import Heart from './Heart'
import ByWhom from './ByWhom'

function Loved(props) {
    const [state] = useGlobalState()
    const [loved, setLoved] = useState(false)
    const [lovedBy, setLovedBy] = useState({})
    const [initialLoveCount, setInitialLoveCount] = useState(props.post.lovedCount)

    useEffect(() => {
        async function fetchLoved() {
            const response = await axios.get(`${state.server_url}/loved/${props.post._id}`)
            const data = await response.data
            setLovedBy(data)

            if (state.stitch.auth.isLoggedIn && state.stitch.auth.user.id in data) {
                setLoved(true)
            } else {
                setLoved(false)
            }
        }
        fetchLoved()
    }, [state.server_url, props.post._id, state])

    const handleClick = () => {
        if (state.stitch.auth.isLoggedIn && state.stitch.auth.user.id in lovedBy) {
            const { [state.stitch.auth.user.id]: _, ...newLovedBy } = lovedBy
            setLoved(false)
            setLovedBy(newLovedBy)
            setInitialLoveCount(initialLoveCount - 1)
        } else {
            setLoved(true)
            setLovedBy({
                ...lovedBy,
                [state.stitch.auth.user.id]: state.stitch.auth.user.profile.data.name
            })
            setInitialLoveCount(initialLoveCount + 1)
        }

        async function updateLoved() {
            await axios.put(`${state.server_url}/loved/${props.post._id}`, {}, {
                headers: {
                    "x-stitch-username": state.stitch.auth.user.profile.name,
                    "x-stitch-user-id": state.stitch.auth.user.id
                }
            })
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