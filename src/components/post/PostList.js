import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { useGlobalState } from '../../state'
import Post from './Post'

function PostList() {
    const [state, dispatch] = useGlobalState()
    const [posts, setPosts] = useState()

    useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get(`${state.server_url}/posts`)
            const data = await response.data
            if (!_.isEqual(state.posts, data)) {
                dispatch({
                    posts: data
                })
            }
        }
        fetchPosts()
    }, [state.server_url])

    useEffect(() => {
        const newPosts = state.posts.map((post) =>
            <Post post={post} key={post._id} />
        )
        setPosts(newPosts)
    }, [state.posts])

    return (
        <>
            {posts}
        </>
    )
}

export default PostList