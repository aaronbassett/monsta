import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import _ from 'lodash'

import { GlobalStateProvider } from './state'
import Post from './components/post/Post'


const { Header, Footer, Content } = Layout;

function App() {

  const data = [
    {
      publishedOn: '2020-04-28T10:42:26Z',
      description: 'Cub doesn’t get this whole social distancing thing 🐶 #covid19',
      author: {
        'username': 'LoLoCoding',
        'avatar': 'https://gravatar.com/avatar/5e002fb3bb4007c9fb0a85c8936070b7?s=200&d=mp&r=pg'
      },
      photo: {
        src: "https://placem.at/people?w=500&h=500",
        filter: "1976"
      },
      comments: []
    },
    {
      publishedOn: '2020-04-28T06:42:26Z',
      description: 'When you can’t go to the bar bring the bar to you.\n\nWe were lamenting on our run today how much we missed the bars in Wynwood, so I made a little bar on the balcony.\nWine, meat, and cheese from the amazing @lagniappe_house, which was open for collection (while wearing my mask obvs)',
      author: {
        'username': 'aaronbassett',
        'avatar': 'https://gravatar.com/avatar/309287088ccfe196428a5dbe2b051c48?s=200&d=mp&r=pg'
      },
      photo: {
        src: "https://placem.at/things?w=500&h=500",
        filter: "Tickled"
      },
      comments: []
    },
    {
      publishedOn: '2019-04-28T06:42:26Z',
      description: 'This is old-fashioned bacon. #barbacon #nyc #cocktails #oldfashioned #bacon',
      author: {
        'username': 'judy2k',
        'avatar': 'https://gravatar.com/avatar/10e1140b7378ae2256f0ab3ed2cbcf6a?s=200&d=mp&r=pg'
      },
      photo: {
        src: "https://placem.at/places?w=500&h=500",
        filter: "Blow Out"
      },
      comments: []
    }
  ]

  const posts = data.map((post) =>
    <Post post={post} />
  )

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
