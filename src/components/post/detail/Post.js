import React from 'react'
import { Card, Avatar, Divider } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import Photo from '../Photo'
import CommentList from '../comments/CommentList'
import Loved from '../loved/Loved'

const { Meta } = Card

function Post(props) {

    return (

        <Card
            bordered={false}
            loading={false}
            hoverable={true}
            cover={
                <Photo cloudinaryId={props.post.photo.public_id} filter={props.post.filter} />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar src={props.post.author.avatar} />}
                title={props.post.author.username}
                description={
                    <ReactMarkdown
                        style={{ padding: "20px" }}
                        source={props.post.description}
                    />
                }
            />

            <Divider dashed />
            <Loved post={props.post} />
            <Divider dashed />

            <CommentList post={props.post} />
        </Card>

    )
}

export default Post