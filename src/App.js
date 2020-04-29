import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import axios from 'axios'

import { GlobalStateProvider, useGlobalState } from './state'
import Post from './components/post/Post'


const { Header, Footer, Content } = Layout;

function App() {

  const [state] = useGlobalState()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(`${state.server_url}/posts`)
      const data = await response.data
      const newPosts = data.map((post) =>
        <Post post={post} key={post._id} />
      )
      setPosts(newPosts)
    }
    fetchPosts()
  }, [state.server_url])

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
