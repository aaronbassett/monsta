import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import { FileMarkdownOutlined } from '@ant-design/icons'


function AddComment(props) {

    return (
        <Form
            form={props.form}
            layout="vertical"
            onFinish={props.submitForm}
            hideRequiredMark
        >
            <Form.Item
                label={<Space><FileMarkdownOutlined /> Comment</Space>}
                name="comment"
                rules={[{ required: true }]}
            >
                <Input.TextArea
                    rows={4}
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
