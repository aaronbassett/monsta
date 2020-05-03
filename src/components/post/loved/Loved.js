import React, { useState, useEffect } from 'react'
import { Space } from 'antd'

import { useGlobalState } from '../../../state'
import createHttpClient from '../../../http'
import Heart from './Heart'
import ByWhom from './ByWhom'

function Loved(props) {
    const [state] = useGlobalState()
    const [loved, setLoved] = useState(false)
    const [lovedBy, setLovedBy] = useState({})
    const [initialLoveCount, setInitialLoveCount] = useState(props.post.lovedCount)
    const stitch = state.stitch
    const http = createHttpClient(state)

    useEffect(() => {
        async function fetchLoved() {
            const response = await http.get(`/loved/${props.post._id}`)
            const data = await response.data
            setLovedBy(data)

            if (stitch.auth.isLoggedIn && stitch.auth.user.id in data) {
                setLoved(true)
            }
        }
        fetchLoved()
    }, [state.server_url, props.post._id, stitch.auth, http])

    const handleClick = () => {
        if (stitch.auth.isLoggedIn && stitch.auth.user.id in lovedBy) {
            const { [stitch.auth.user.id]: _, ...newLovedBy } = lovedBy
            setLoved(false)
            setLovedBy(newLovedBy)
            setInitialLoveCount(initialLoveCount - 1)
        } else {
            setLoved(true)
            setLovedBy({
                ...lovedBy,
                [stitch.auth.user.id]: stitch.auth.user.profile.data.name
            })
            setInitialLoveCount(initialLoveCount + 1)
        }

        async function updateLoved() {
            await http.put(`/loved/${props.post._id}`)
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