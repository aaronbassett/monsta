import React from 'react'
import { Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'

function CreateButton(props) {
    return (
        <Button
            onClick={props.onClick}
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
            type="ghost"
            shape="circle"
            icon={<PlusCircleFilled />}
            size="large"
        />
    )
}

export default CreateButton