import React from 'react'
import { Space } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';
import CountUp from 'react-countup'
import Pluralize from 'react-pluralize'
import { HashLink as Link } from 'react-router-hash-link'
import _ from 'lodash'

function CommentCount(props) {
    const count = _.reduce(props.comments, (runningCount, comment) => {
        return ("comments" in comment) ? runningCount + comment.comments.length + 1 : runningCount + 1
    }, 0)

    return (
        <Link to={`/p/${props.post._id}#comments`}>
            <Space>
                <MessageTwoTone
                    twoToneColor="#ccc"
                    key="comments"
                />
                <b><CountUp end={count} /></b><Pluralize singular={'comment'} count={count} showCount={false} />
            </Space>
        </Link>
    )
}

CommentCount.defaultProps = {
    comments: []
}

export default CommentCount