import React, { useState } from 'react'
import { Button, Modal, Space, Typography, Form, Input, Tag } from 'antd'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'


const { Text } = Typography

export function DeletePostButton(props) {
    if (props.isLoggedIn && props.author.userId === props.user.id) {
        return (
            <Button
                icon={<DeleteOutlined key="delete" />}
                type="link"
                onClick={() => props.setModalVisible(true)}
                block
                danger
            >
                Delete
            </Button>
        )
    } else {
        return null
    }
}

export function DeletePostModal(props) {
    const [form] = Form.useForm()

    function hideDeleteModal() {
        props.setDeleteConfirmationString("")
        form.resetFields()
        props.setModalVisible(false)
    }

    function handleConfirmationStringInput(event) {
        props.setDeleteConfirmationString(event.target.value)
    }

    return (
        <Modal
            visible={props.modalVisible}
            title={
                <Space>
                    <Text type="danger">
                        <Tag icon={<ExclamationCircleFilled />} color="#ff0000">STOP</Tag>
                        <b> Do you really want to delete this photo?</b>
                    </Text>
                </Space>
            }
            danger
            onCancel={hideDeleteModal}
            footer={[
                <Button
                    key="cancel"
                    type="primary"
                    onClick={hideDeleteModal}
                >
                    Cancel
                </Button>,
                <Button
                    key="delete"
                    type="primary"
                    onClick={props.handleDeletePost}
                    disabled={props.deleteConfirmationString.toUpperCase() !== "DELETE"}
                    loading={props.deleteInProgress}
                    danger
                >
                    Delete
                </Button>
            ]}
        >
            <p>Please confirm you want to delete this photo by entering the text <b>DELETE</b> in the box below.</p>
            <p>
                <Form
                    form={form}
                    autocomplete="off"
                >
                    <Form.Item
                        name="deleteConfirmation"
                    >
                        <Input
                            onChange={handleConfirmationStringInput}
                        />
                    </Form.Item>
                </Form>
            </p>

        </Modal>
    )
}
