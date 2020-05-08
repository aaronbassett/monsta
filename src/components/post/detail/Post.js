import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Card, Avatar, Divider, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import Photo from '../Photo'
import CommentList from '../comments/CommentList'
import Loved from '../loved/Loved'
import { useGlobalState } from '../../../state'
import { DeletePostButton, DeletePostModal } from './Delete'
import UserLink from '../../user/UserLink'

const { Meta } = Card

function Post(props) {

    let history = useHistory()
    const [deleteConfirmationString, setDeleteConfirmationString] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const [state] = useGlobalState()

    useEffect(() => {
        setDeleteConfirmationString("")
    }, [state.stitch.auth, props.post.author.userId])


    function handleDeletePost() {
        setDeleteInProgress(true)

        axios.delete(`${state.server_url}/posts/${props.post._id}`, {
            headers: {
                "x-stitch-username": state.stitch.auth.user.profile.name,
                "x-stitch-user-id": state.stitch.auth.user.id,
                "x-stitch-user-avatar": state.stitch.auth.user.profile.pictureUrl
            }
        }).then((response) => {
            setDeleteInProgress(false)
            setModalVisible(false)
            history.push("/")
        }).catch((error) => {
            setDeleteInProgress(false)
            message.error("Error deleting photo")
        })
    }


    return (

        <>

            <Card
                bordered={false}
                loading={false}
                hoverable={true}
                cover={
                    <Photo cloudinaryId={props.post.photo.public_id} filter={props.post.filter} />
                }
                actions={[
                    <DeletePostButton
                        setModalVisible={setModalVisible}
                        isLoggedIn={state.stitch.auth.isLoggedIn}
                        author={props.post.author}
                        user={state.stitch.auth.user}
                    />
                ]}
            >
                <Meta
                    avatar={<Avatar src={props.post.author.avatar} />}
                    title={<UserLink username={props.post.author.username} userId={props.post.author.userId} />}
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

            <DeletePostModal
                modalVisible={modalVisible}
                deleteConfirmationString={deleteConfirmationString}
                setDeleteConfirmationString={setDeleteConfirmationString}
                setModalVisible={setModalVisible}
                deleteInProgress={deleteInProgress}
                handleDeletePost={handleDeletePost}
            />

        </>

    )
}

export default Post