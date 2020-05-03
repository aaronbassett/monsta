import React, { useEffect } from 'react'
import { Menu } from 'antd';
import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons';
import { GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk'

import { useGlobalState } from '../../state'

function Login(props) {
    const [state] = useGlobalState()
    const stitch = state.stitch

    useEffect(() => {
        if (stitch.auth.hasRedirectResult()) {
            stitch.auth.handleRedirectResult()
        }
    }, [stitch.auth])

    function handleClick() {
        if (stitch.auth.isLoggedIn) {
            stitch.auth.logout()
        } else {
            stitch.auth.loginWithRedirect(new GoogleRedirectCredential())
        }
    }

    return (
        <Menu onClick={handleClick} theme="dark" mode="horizontal">
            <Menu.Item style={{ float: "right" }} key="login">
                {(stitch.auth.isLoggedIn) ? <LockTwoTone twoToneColor="#eee" /> : <UnlockTwoTone twoToneColor="#eee" />}
                {(stitch.auth.isLoggedIn) ? "Logout" : "Login"}
            </Menu.Item>
        </Menu>
    )
}

export default Login
