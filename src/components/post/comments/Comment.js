import React from 'react'
import { Layout, Comment, Avatar, Tag, Space, Divider } from 'antd'
import TimeAgo from 'react-timeago'
import ReactMarkdown from 'react-markdown'

import UserLink from '../../user/UserLink'

const { Content } = Layout

function PostComment(props) {

    const dateTimeTag = (
        <Space>
            <TimeAgo date={props.comment.publishedOn} minPeriod={10} />
            {(props.post.author.userId === props.comment.author.userId) ? <Tag color="green">author</Tag> : null}
        </Space>
    )

    return (
        <>
            <Comment
                author={<UserLink userId={props.comment.author.userId} username={props.comment.author.username} />}
                avatar={
                    <Avatar
                        src={props.comment.author.avatar}
                        alt={props.comment.author.username}
                    />
                }
                content={
                    <ReactMarkdown
                        style={{ padding: "20px" }}
                        source={props.comment.comment}
                    />
                }
                datetime={dateTimeTag}
            />
            <Divider dashed />
        </>
    )
}

export default PostComment
