import React from 'react'
import { Layout, Space } from 'antd';
import MongoDbLogo from '../../svg/MongoDB_Logo_FullColorBlack_RGB.svg'

const { Footer } = Layout;

function MonstaFooter(props) {
    return (
        <Footer style={{ textAlign: 'center' }}>
            <Space direction="vertical">
                <p><img src={MongoDbLogo} style={{ height: "50px" }} alt="MongoDB logo" /></p>
                <p>Monsta - a MERN demo application by <a href="https://twitter.com/aaronbassett">@aaronbassett</a></p>
            </Space>
        </Footer>
    )
}

export default MonstaFooter