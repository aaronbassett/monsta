import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Row, Col, Card, Avatar, Divider } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import axios from 'axios'
import Photo, { photoUrl } from '../Photo'
import CommentList from '../comments/CommentList'
import AddComment from '../comments/AddComment'
import Loved from '../loved/Loved'

import { useGlobalState } from '../../../state'

const { Content } = Layout
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
                description={props.post.description}
            />

            <Divider dashed />
            <Loved post={props.post} />
            <Divider dashed />

            <CommentList post={props.post} />
        </Card>

    )
}

export default Post