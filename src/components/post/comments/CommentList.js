import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import { animateScroll as scroll } from 'react-scroll'
import axios from 'axios'
import PostComment from './Comment'
import AddComment from './AddComment'

import { useGlobalState } from '../../../state'

function CommentList(props) {

    const [form] = Form.useForm()
    const [state] = useGlobalState()
    const [post, setPost] = useState(props.post)
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (window.location.hash === "#comments") {
            scroll.scrollTo(650, {
                duration: 400
            })
        }
    }, [])

    useEffect(() => {
        if (post.comments) {
            const newComments = post.comments.map((comment) =>
                <PostComment post={post} comment={comment} key={comment._id} />
            )
            setComments(newComments)
        }
    }, [post.comments])

    function submitForm(values) {
        console.log(values)
        axios.post(`${state.server_url}/comments/${props.post._id}`, {
            comment: values.comment
        }, {
            headers: {
                "x-stitch-username": state.stitch.auth.user.profile.name,
                "x-stitch-user-id": state.stitch.auth.user.id,
                "x-stitch-user-avatar": state.stitch.auth.user.profile.pictureUrl
            }
        }).then((response) => {
            setPost(response.data)
            form.resetFields()
        }).catch((error) => {
            message.error("Error adding comment")
        })
    }

    return (
        <div id="#comments">
            {comments}
            <AddComment form={form} submitForm={submitForm} />
        </div>
    )
}

export default CommentList
