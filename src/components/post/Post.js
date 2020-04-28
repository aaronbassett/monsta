import React, { useState, useEffect } from 'react'
import { Layout, Card } from 'antd'

import Photo from './Photo'
import PostBody from './body/PostBody'

const { Sider, Content } = Layout

function Post(props) {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(false)
        async function preloadImage() {
            const img = new Image()
            img.src = props.post.photo.src
            img.onload = (event) => {
                setLoaded(true)
            }
        }
        preloadImage()
    }, [props.post.photo.src])

    return (
        <Card
            bodyStyle={{ padding: 0, marginBottom: "20px" }}
            bordered={false}
            loading={!loaded}
            hoverable={true}
        >
            <Layout>
                <Content>
                    <Photo photo={props.post.photo} />
                </Content>

                <Sider style={{ backgroundColor: "#fff" }} width="400px">
                    <PostBody post={props.post} />
                </Sider>
            </Layout>
        </Card>
    )
}

export default Post