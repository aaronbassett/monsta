import React from 'react'
import { Button, Form, Col, Row, Input, Select, Upload, Space } from 'antd'
import { LoadingOutlined, PictureOutlined, DeleteFilled, FileMarkdownOutlined, CameraOutlined, BgColorsOutlined } from '@ant-design/icons'
import _ from 'lodash'
import Photo from '../Photo'

import { useGlobalState } from '../../../state'
import filters from '../Filters'

const { Option, OptGroup } = Select
const { Dragger } = Upload

function UploadForm(props) {
    const [state] = useGlobalState()

    function imagePreview() {
        const filterOptions = _.keys(filters).sort().map((filter) =>
            (filter !== "Default") ? <Option value={filter}>{filter}</Option> : null
        )

        return (
            <>
                <Row gutter={16}>
                    <Col span={24} style={{ positon: "relative" }}>
                        <Form.Item>
                            <Photo cloudinaryId={props.photo.public_id} filter={props.filter} />
                        </Form.Item>
                        <Button
                            shape="circle"
                            onClick={props.clearPhoto}
                            icon={<DeleteFilled />}
                            style={{ position: "absolute", top: -15, right: -5 }}
                            danger
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="filter"
                            label={<Space><BgColorsOutlined /> Choose a Filter</Space>}
                        >
                            <Select onChange={props.handleFilterChange}>
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

    function imageUploadArea() {
        return (
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        label={<Space><CameraOutlined /> Photo</Space>}
                    >
                        <Dragger
                            name="post"
                            multiple={false}
                            showUploadList={false}
                            action={`${state.server_url}/posts/image`}
                            headers={(state.stitch.auth.isLoggedIn) ? {
                                "x-stitch-username": state.stitch.auth.user.profile.name,
                                "x-stitch-user-id": state.stitch.auth.user.id
                            } : {}}
                            beforeUpload={props.beforeImageUpload}
                            onChange={props.handleImageUpload}
                        >

                            <p className="ant-upload-text">
                                {props.imageUploading ? <LoadingOutlined /> : <PictureOutlined />}
                            </p>
                        </Dragger>
                    </Form.Item>
                </Col>
            </Row>
        )
    }

    return (
        <Form
            layout="vertical"
            form={props.form}
            onFinish={props.submitForm}
            hideRequiredMark
        >
            {props.photo.public_id ? imagePreview() : imageUploadArea()}

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        label={<Space><FileMarkdownOutlined /> Description</Space>}
                    >
                        <Input.TextArea
                            rows={4}
                            autoSize={{ minRows: 4, maxRows: 8 }}
                            placeholder="Photo description"
                            onChange={props.updateImageDescription}
                            allowClear={true}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default UploadForm