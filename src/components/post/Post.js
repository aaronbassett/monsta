import React from 'react'
import { Layout, Card } from 'antd'

import Photo from './Photo'
import PostBody from './body/PostBody'

const { Sider, Content } = Layout

function Post(props) {
    return (
        <Card
            bodyStyle={{ padding: 0, marginBottom: "20px" }}
            bordered={false}
            loading={false}
            hoverable={true}
        >
            <Layout>
                <Content>
                    <Photo photo={props.post.photo} />
                </Content>

                <Sider style={{ backgroundColor: "#fff" }} width="400px">
                    <PostBody post={props.post} />
                </Sider>
            </Layout>
        </Card>
    )
}

export default Post