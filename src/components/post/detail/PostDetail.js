import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Row, Col, Card } from 'antd'
import axios from 'axios'
import Post from './Post'

import { useGlobalState } from '../../../state'

const { Content } = Layout

function PostDetail(props) {
    let { postId } = useParams()

    const [state] = useGlobalState()
    const [loaded, setLoaded] = useState(false)
    const [post, setPost] = useState({})

    useEffect(() => {
        async function fetchPost() {
            const response = await axios.get(`${state.server_url}/posts/${postId}`)
            const data = await response.data
            setPost(data)
            setLoaded(true)
        }
        fetchPost()
    }, [state.server_url, postId])


    return (
        <Content style={{ padding: '0 50px', marginTop: "50px" }}>
            <Row justify="center">
                <Col flex="500px">
                    {(loaded) ? <Post post={post} /> : <Card bordered={false} loading={!loaded} hoverable={true} />}
                </Col>
            </Row>
        </Content>
    )
}

export default PostDetail