import React from 'react'
import { Button, Drawer } from 'antd'
import _ from 'lodash'

import UploadForm from './Form'


function UploadDrawer(props) {

    const drawerFooter = (
        <div style={{ textAlign: 'right' }}>
            <Button onClick={props.closeDrawer} style={{ marginRight: 8 }}>
                Cancel
            </Button>
            <Button onClick={props.closeDrawer} type="primary">
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
                handleFilterChange={props.handleFilterChange}
                beforeImageUpload={props.beforeImageUpload}
                handleImageUpload={props.handleImageUpload}
                imageUploading={props.imageUploading}
            />
        </Drawer>
    )
}

export default UploadDrawer