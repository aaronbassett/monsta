import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../state'
import createHttpClient from '../../http'
import Post from './Post'

function PostList() {
    const [state] = useGlobalState()
    const [posts, setPosts] = useState([])
    const http = createHttpClient(state)

    useEffect(() => {
        async function fetchPosts() {
            const response = await http.get(`/posts`)
            const data = await response.data
            const newPosts = data.map((post) =>
                <Post post={post} key={post._id} />
            )
            setPosts(newPosts)
        }
        fetchPosts()
    }, [state.server_url])

    return (
        <>
            {posts}
        </>
    )
}

export default PostList