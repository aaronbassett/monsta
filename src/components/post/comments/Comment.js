import React from 'react'
import { Comment, Avatar, Tag, Space, Divider, Button } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import TimeAgo from 'react-timeago'
import ReactMarkdown from 'react-markdown'

import UserLink from '../../user/UserLink'

function PostComment(props) {

    const actions = []
    const dateTimeTag = (
        <Space>
            <TimeAgo date={props.comment.publishedOn} minPeriod={10} />
            {(props.post.author.userId === props.comment.author.userId) ? <Tag color="green">author</Tag> : null}
        </Space>
    )

    if (props.allowReplies) {
        actions.push(
            <Button
                type="link"
                size="small"
                icon={<CommentOutlined />}
                style={{ color: "#ccc" }}
                onClick={() => props.replyTo(props.comment.author, props.commentIndex)}
            >
                reply
            </Button>
        )
    }

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
                actions={actions}
                content={
                    <ReactMarkdown
                        style={{ padding: 0 }}
                        source={props.comment.comment}
                    />
                }
                datetime={dateTimeTag}
            >
                {props.children}
            </Comment>
            {props.allowReplies && <Divider dashed />}
        </>
    )
}

export default PostComment
