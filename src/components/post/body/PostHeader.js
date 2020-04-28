import React from 'react'
import { PageHeader } from 'antd';
import TimeAgo from 'react-timeago'

function PostHeader(props) {
    return (
        <PageHeader
            title={`@${props.post.author.username}`}
            subTitle={<TimeAgo date={props.post.publishedOn} minPeriod={30} />}
            avatar={{ src: props.post.author.avatar }}
        />
    )
}

export default PostHeader