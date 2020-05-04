import React from 'react'
import { PageHeader } from 'antd';
import TimeAgo from 'react-timeago'

import UserLink from '../../user/UserLink'

function PostHeader(props) {
    return (
        <PageHeader
            title={<UserLink userId={props.post.author.userId} username={props.post.author.username} />}
            subTitle={<TimeAgo date={props.post.publishedOn} minPeriod={30} />}
            avatar={{ src: props.post.author.avatar }}
        />
    )
}

export default PostHeader