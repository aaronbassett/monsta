import React, { useState, useEffect } from 'react'
import { message, Form } from 'antd'
import axios from 'axios'

import { useGlobalState } from '../../state'
import CreateButton from './upload/CreateButton'
import UploadDrawer from './upload/Drawer'


function PostCreate() {
    const [form] = Form.useForm()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [photo, setPhoto] = useState({})
    const [filter, setFilter] = useState("Default")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [imageDescription, setImageDescription] = useState({ value: "" })
    const [state, dispatch] = useGlobalState()

    useEffect(() => {
        setIsLoggedIn(state.stitch.auth.isLoggedIn)
    }, [state])

    function openDrawer() {
        setDrawerVisible(true)
    }

    function handleDrawerClose() {
        setDrawerVisible(false)
        clearPhoto()
    }

    function closeDrawer() {
        handleDrawerClose()
    }

    function handleFilterChange(value) {
        setFilter(value)
    }

    function clearPhoto() {
        setPhoto({})
    }

    function beforeImageUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
            message.error('Image must smaller than 5MB!')
        }
        return isJpgOrPng && isLt2M
    }

    function handleImageUpload(info) {
        if (info.file.status === 'uploading') {
            setImageUploading(true)
            return
        } else if (info.file.status === 'done') {
            setPhoto(info.file.response)
            setImageUploading(false)
        }
    }

    function updateImageDescription(event) {
        setImageDescription({
            value: event.target.value
        })
    }

    function submitForm(fields) {
        if (!isLoggedIn) {
            message.error('Please login to upload a photo')
            return
        }
        if (!photo.public_id) {
            message.error('Please upload a photo')
            return
        }
        if (!fields.description) {
            message.error('Please enter a description')
            return
        }

        const filter = (fields.filter) ? fields.filter : "Default"

        axios.post(`${state.server_url}/posts`, {
            photo: photo,
            filter: filter,
            description: fields.description
        }, {
            headers: {
                "x-stitch-username": state.stitch.auth.user.profile.name,
                "x-stitch-user-id": state.stitch.auth.user.id,
                "x-stitch-user-avatar": state.stitch.auth.user.profile.pictureUrl
            }
        }).then((response) => {
            form.resetFields()
            clearPhoto()
            setFilter("Default")
            setDrawerVisible(false)
            dispatch({
                ...state,
                posts: response.data
            })
        }).catch((error) => {
            message.error("Error uploading photo")
        })
    }

    return (!isLoggedIn) ?
        null
        :
        (
            <>
                <UploadDrawer
                    closeDrawer={closeDrawer}
                    handleDrawerClose={handleDrawerClose}
                    drawerVisible={drawerVisible}
                    clearPhoto={clearPhoto}
                    photo={photo}
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    beforeImageUpload={beforeImageUpload}
                    handleImageUpload={handleImageUpload}
                    imageUploading={imageUploading}
                    imageDescription={imageDescription}
                    updateImageDescription={updateImageDescription}
                    form={form}
                    submitForm={submitForm}
                />
                <CreateButton onClick={openDrawer} />
            </>
        )
}

export default PostCreate