import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import Icon from '@ant-design/icons';

import { GlobalStateProvider, useGlobalState } from './state'
import createHttpClient from './http'
import MongoIconSvg from './monsta-icon.svg'
import Login from './components/user/Login'
import Post from './components/post/Post'

const { Header, Footer, Content } = Layout;

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
                <Header>
                    <img style={{ height: "31px", float: "left", marginTop: "16px" }} src={MongoIconSvg} />
                    <Login />
                </Header>

                <Content style={{ padding: '0 50px', marginTop: "50px" }}>
                    <Row justify="center">
                        <Col flex="900px">
                            {posts}
                        </Col>
                    </Row>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Footer</Footer>
            </Layout >
        </GlobalStateProvider>
    )
}

export default App;
