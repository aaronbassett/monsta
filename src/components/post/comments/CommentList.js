import React, { useState, useEffect, useRef } from 'react'
import { Form, message } from 'antd'
import { animateScroll as scroll } from 'react-scroll'
import axios from 'axios'
import PostComment from './Comment'
import AddComment from './AddComment'

import { useGlobalState } from '../../../state'

function CommentList(props) {

    const [form] = Form.useForm()
    const commentTextarea = useRef(null)
    const [state] = useGlobalState()
    const [post, setPost] = useState(props.post)
    const [comments, setComments] = useState([])
    const [replyingTo, setReplyingTo] = useState({})

    useEffect(() => {
        if (window.location.hash === "#comments") {
            scroll.scrollTo(650, {
                duration: 400
            })
        }
    }, [])

    useEffect(() => {
        if (post.comments) {
            const newComments = post.comments.map((comment, index) => {
                const replies = (comment.comments) ? comment.comments.map((reply) => {
                    return (
                        <PostComment post={post} comment={reply} key={reply._id} />
                    )
                }) : null

                return (
                    <PostComment post={post} comment={comment} commentIndex={index} replyTo={replyTo} key={comment._id} allowReplies={true}>
                        {replies}
                    </PostComment>
                )
            })
            setComments(newComments)
        }
    }, [post])

    function submitForm(values) {
        axios.post(`${state.server_url}/comments/${props.post._id}`, {
            replyTo: replyingTo.commentId,
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
            cancelReplyTo()
        }).catch((error) => {
            message.error("Error adding comment")
        })
    }

    function replyTo(user, commentIndex) {
        setReplyingTo({
            user: user,
            commentId: commentIndex
        })
        commentTextarea.current.focus()
        scroll.scrollToBottom()
    }

    function cancelReplyTo() {
        setReplyingTo({})
    }

    return (
        <div id="#comments">
            {comments}
            <AddComment
                form={form}
                submitForm={submitForm}
                replyingTo={replyingTo}
                cancelReplyTo={cancelReplyTo}
                commentTextarea={commentTextarea}
            />
        </div>
    )
}

export default CommentList
