import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGlobalState } from '../../state'
import Post from './Post'

function PostList(props) {
    const [state, dispatch] = useGlobalState()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const postsUrl = (props.userId) ? `${state.server_url}/posts/user/${props.userId}` : `${state.server_url}/posts`
            const response = await axios.get(postsUrl)
            const data = await response.data
            dispatch({
                posts: data
            })
            setLoading(false)
        }
        fetchPosts()
    }, [state.server_url, dispatch])


    useEffect(() => {
        if (!loading) {
            const newPosts = state.posts.map((post) =>
                <Post post={post} key={post._id} />
            )
            setPosts(newPosts)
        }
    }, [loading, state.posts])


    return (
        <>
            {posts}
        </>
    )
}

export default PostList