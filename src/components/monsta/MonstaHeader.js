import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd';
import MonstaLogoSvg from '../../svg/monsta-icon.svg'
import Login from '../user/Login'

const { Header } = Layout;

function MonstaHeader() {
    return (
        <Header>
            <Link to="/">
                <img style={{ height: "31px", float: "left", marginTop: "16px" }} src={MonstaLogoSvg} alt="Monsta (MERN demo app) Logo" />
            </Link>
            <Login />
        </Header>
    )
}

export default MonstaHeader