import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Space } from 'antd';

import { GlobalStateProvider, useGlobalState } from './state'
import createHttpClient from './http'
import { MonstaHeader, MonstaFooter } from './components/monsta'
import Post from './components/post/Post'

const { Content } = Layout;

function App() {

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
    }, [state.server_url, http])

    return (
        <GlobalStateProvider>
            <Layout className="layout">
                <MonstaHeader />

                <Content style={{ padding: '0 50px', marginTop: "50px" }}>
                    <Row justify="center">
                        <Col flex="900px">
                            {posts}
                        </Col>
                    </Row>
                </Content>

                <MonstaFooter />
            </Layout >
        </GlobalStateProvider>
    )
}

export default App;
