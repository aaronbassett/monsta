import React from 'react'
import { Layout, Divider, Comment, Tooltip, Avatar } from 'antd'
import TimeAgo from 'react-timeago'

import Loved from '../loved/Loved'
import CommentCount from '../comments/CommentCount'
import UserLink from '../../user/UserLink'
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
                    <Loved post={props.post} />
                    <br />
                    <CommentCount comments={props.post.comments} post={props.post} />
                </Content>
            </Layout>
        </>
    )
}

export default PostBody