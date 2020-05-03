import React from 'react'
import { Layout, Divider } from 'antd'

import CommentCount from '../comments/CommentCount'
import PostHeader from './PostHeader'
import PostDescription from './PostDescription'

const { Content } = Layout

function PostBody(props) {
    return (
        <>
            <PostHeader post={props.post} />

            <Layout>
                <Content style={{ padding: "20px", backgroundColor: "#fff" }}>
                    <PostDescription post={props.post} />
                    <Divider dashed />
                    <br />
                    <CommentCount comments={props.post.comments} />
                </Content>
            </Layout>
        </>
    )
}

export default PostBody