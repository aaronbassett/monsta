import React from 'react'
import { Layout } from 'antd';
import MonstaLogoSvg from '../../svg/monsta-icon.svg'
import Login from '../user/Login'

const { Header } = Layout;

function MonstaHeader() {
    return (
        <Header>
            <a href="/">
                <img style={{ height: "31px", float: "left", marginTop: "16px" }} src={MonstaLogoSvg} alt="Monsta (MERN demo app) Logo" />
            </a>
            <Login />
        </Header>
    )
}

export default MonstaHeader