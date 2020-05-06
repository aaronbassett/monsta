import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import { FileMarkdownOutlined } from '@ant-design/icons'
import UserLink from '../../user/UserLink'


function AddComment(props) {

    const commentLabel = (
        <Space>
            <FileMarkdownOutlined />
            {
                (props.replyingTo.user) ?
                    (
                        <>
                            Replying to
                            <UserLink userId={props.replyingTo.user.userId} username={props.replyingTo.user.username} />
                            <Button
                                type="link"
                                shape="circle"
                                size="small"
                                style={{ color: "#aaa" }}
                                onClick={props.cancelReplyTo}
                            >
                                (cancel)
                            </Button>
                        </>
                    )
                    :
                    'Comment'
            }
        </Space>
    )

    return (
        <Form
            form={props.form}
            layout="vertical"
            onFinish={props.submitForm}
            hideRequiredMark
        >
            <Form.Item
                label={commentLabel}
                name="comment"
                rules={[{ required: true }]}
            >
                <Input.TextArea
                    rows={4}
                    ref={props.commentTextarea}
                />
            </Form.Item>

            <Form.Item>
                <Button style={{ float: "right" }} htmlType="submit">
                    Add Comment
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddComment
