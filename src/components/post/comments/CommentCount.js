import React from 'react'
import { Space } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';
import CountUp from 'react-countup'
import Pluralize from 'react-pluralize'

function CommentCount(props) {
    const count = props.comments.length
    return (
        <Space>
            <MessageTwoTone
                twoToneColor="#ccc"
                key="comments"
            />
            <b><CountUp end={count} /></b><Pluralize singular={'comment'} count={count} showCount={false} />
        </Space>
    )
}

CommentCount.defaultProps = {
    comments: []
}

export default CommentCount