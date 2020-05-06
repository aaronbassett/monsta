import React from 'react'
import { Layout, Row, Col } from 'antd'
import PostList from '../post/PostList'

const { Content } = Layout

function MonstaBody(props) {
    return (
        <Content style={{ padding: '0 50px', marginTop: "50px" }}>
            <Row justify="center">
                <Col flex="900px">
                    <PostList />
                </Col>
            </Row>
        </Content>
    )
}

export default MonstaBody