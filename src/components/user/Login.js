import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons';
import { GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk'

import { useGlobalState } from '../../state'

function Login() {
    const [state, dispatch] = useGlobalState()
    const [loggedIn, setLoggedIn] = useState(state.stitch.auth.isLoggedIn)

    useEffect(() => {
        if (state.stitch.auth.hasRedirectResult()) {
            state.stitch.auth.handleRedirectResult().then(() => {
                setLoggedIn(state.stitch.auth.isLoggedIn)
                dispatch(state)
            })
        }
    }, [state.stitch.auth])

    function handleClick() {
        if (loggedIn) {
            state.stitch.auth.logout().then(() => {
                setLoggedIn(state.stitch.auth.isLoggedIn)
                dispatch(state)
            })
        } else {
            state.stitch.auth.loginWithRedirect(new GoogleRedirectCredential())
            dispatch(state)
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
