import React from 'react'
import { Button, Drawer } from 'antd'

import UploadForm from './Form'


function UploadDrawer(props) {

    const drawerFooter = (
        <div style={{ textAlign: 'right' }}>
            <Button onClick={props.closeDrawer} style={{ marginRight: 8 }}>
                Cancel
            </Button>
            <Button onClick={props.form.submit} type="primary">
                Submit
            </Button>
        </div>
    )

    return (
        <Drawer
            title="Upload a new photo"
            width={548}
            onClose={props.handleDrawerClose}
            visible={props.drawerVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={drawerFooter}
        >
            <UploadForm
                clearPhoto={props.clearPhoto}
                photo={props.photo}
                filter={props.filter}
                handleFilterChange={props.handleFilterChange}
                beforeImageUpload={props.beforeImageUpload}
                handleImageUpload={props.handleImageUpload}
                imageUploading={props.imageUploading}
                imageDescription={props.imageDescription}
                updateImageDescription={props.updateImageDescription}
                form={props.form}
                submitForm={props.submitForm}
            />
        </Drawer>
    )
}

export default UploadDrawer