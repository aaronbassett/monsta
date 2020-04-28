import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import axios from 'axios'

import { GlobalStateProvider } from './state'
import Post from './components/post/Post'


const { Header, Footer, Content } = Layout;

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get('http://localhost:8080/posts/')
      const data = await response.data
      const newPosts = data.map((post) =>
        <Post post={post} />
      )
      setPosts(newPosts)
    }
    fetchPosts()
  }, [])

  return (
    <GlobalStateProvider>
      <Layout className="layout">
        <Header>
          <div className="logo" />
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
