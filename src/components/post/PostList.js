import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../state'
import createHttpClient from '../../http'
import Post from './Post'

function PostList() {
    const [state, dispatch] = useGlobalState()
    const [posts, setPosts] = useState([])
    const http = createHttpClient(state)

    useEffect(() => {
        async function fetchPosts() {
            const response = await http.get(`/posts`)
            const data = await response.data
            dispatch({
                ...state,
                posts: data
            })
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