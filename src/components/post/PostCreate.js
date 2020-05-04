import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import _ from 'lodash'

import { useGlobalState } from '../../state'
import CreateButton from './upload/CreateButton'
import UploadDrawer from './upload/Drawer'


function PostCreate() {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [photo, setPhoto] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [state] = useGlobalState()

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
        setPhoto({
            ...photo,
            filter: value
        })
    }

    function clearPhoto() {
        setPhoto({})
    }

    function beforeImageUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    }

    function handleImageUpload(info) {
        if (info.file.status === 'uploading') {
            setImageUploading(true)
            return
        } else if (info.file.status === 'done') {
            const previewImageUrl = `${process.env.REACT_APP_CLOUDINARY_IMAGE_URL}${info.file.response.public_id}`
            setPhoto({ src: previewImageUrl })
            setImageUploading(false)
        }
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
                    handleFilterChange={handleFilterChange}
                    beforeImageUpload={beforeImageUpload}
                    handleImageUpload={handleImageUpload}
                    imageUploading={imageUploading}
                />
                <CreateButton onClick={openDrawer} />
            </>
        )
}

export default PostCreate