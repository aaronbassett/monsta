import React, { useState, useEffect } from 'react'
import { Button, Drawer, Form, Col, Row, Input, Select, Upload, message, Space } from 'antd'
import { PlusCircleFilled, LoadingOutlined, PictureOutlined, DeleteFilled, FileMarkdownOutlined } from '@ant-design/icons'
import _ from 'lodash'
import Photo from './Photo'

import { useGlobalState } from '../../state'
import filters from './Filters'

const { Option, OptGroup } = Select
const { Dragger } = Upload

function PostCreate() {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [photo, setPhoto] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [state] = useGlobalState()

    useEffect(() => {
        setIsLoggedIn(state.stitch.auth.isLoggedIn)
    }, [state])

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    function handleClick() {
        setDrawerVisible(true)
    }

    function handleOnClose() {
        setDrawerVisible(false)
    }

    function handleClose() {
        handleOnClose()
    }

    function handleFilterChange(value) {
        setPhoto({
            ...photo,
            filter: value
        })
    }

    function clearPhoto() {
        setPhoto({})
    }

    function imagePreview() {
        const filterOptions = _.keys(filters).sort().map((filter) =>
            (filter !== "Default") ? <Option value={filter}>{filter}</Option> : null
        )
        return (
            <>
                <Row gutter={16}>
                    <Col span={24} style={{ positon: "relative" }}>
                        <Form.Item>
                            <Photo photo={photo} />
                        </Form.Item>
                        <Button shape="circle" onClick={clearPhoto} icon={<DeleteFilled />} style={{ position: "absolute", top: -15, right: -5 }} danger >

                        </Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="filter"
                            label="Choose a filter"
                        >
                            <Select onChange={handleFilterChange}>
                                <Option value="Default">No filter</Option>
                                <OptGroup label="filters ---">
                                    {filterOptions}
                                </OptGroup>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </>
        )
    }

    const imageUploadArea = (
        <Row gutter={16}>
            <Col span={24}>
                <Form.Item>
                    <Dragger
                        name="post"
                        multiple={false}
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleUpload}
                    >

                        <p className="ant-upload-text">{imageUploading ? <LoadingOutlined /> : <PictureOutlined />}</p>
                    </Dragger>
                </Form.Item>
            </Col>
        </Row>
    )

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M;
    }

    function handleUpload(info) {
        if (info.file.status === 'uploading') {
            setImageUploading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, newImageUrl => {
                setPhoto({ src: newImageUrl })
                setImageUploading(false)
            })
        }
    }

    return (!isLoggedIn) ?
        null
        :
        (
            <>
                <Drawer
                    title="Upload a new photo"
                    width={548}
                    onClose={handleOnClose}
                    visible={drawerVisible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button
                                onClick={handleClose}
                                style={{ marginRight: 8 }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleClose} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        {photo.src ? imagePreview() : imageUploadArea}

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label={<Space><FileMarkdownOutlined /> Description</Space>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter a description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="Photo description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
                <Button onClick={handleClick} style={{ position: "fixed", bottom: "20px", right: "20px" }} type="ghost" shape="circle" icon={<PlusCircleFilled />} size="large" />
            </>
        )
}

export default PostCreate