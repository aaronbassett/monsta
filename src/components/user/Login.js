import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons';
import { GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk'

import { useGlobalState } from '../../state'

function Login() {
    const [state] = useGlobalState()
    const stitch = state.stitch
    const [loggedIn, setLoggedIn] = useState(stitch.auth.isLoggedIn)

    useEffect(() => {
        if (stitch.auth.hasRedirectResult()) {
            stitch.auth.handleRedirectResult().then(() => {
                setLoggedIn(stitch.auth.isLoggedIn)
            })
        }
    }, [stitch.auth])

    function handleClick() {
        if (loggedIn) {
            stitch.auth.logout().then(() => {
                setLoggedIn(stitch.auth.isLoggedIn)
            })
        } else {
            stitch.auth.loginWithRedirect(new GoogleRedirectCredential())
        }
    }

    return (
        <Menu onClick={handleClick} theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item style={{ float: "right" }} key="login">
                {(loggedIn) ? <LockTwoTone twoToneColor="#eee" /> : <UnlockTwoTone twoToneColor="#eee" />}
                {(loggedIn) ? "Logout" : "Login"}
            </Menu.Item>
        </Menu>
    )
}

export default Login
