import React, { useState, useEffect } from 'react'
import { Layout, Card } from 'antd'

import Photo, { photoUrl } from './Photo'
import PostBody from './body/PostBody'

const { Sider, Content } = Layout

function Post(props) {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(false)
        async function preloadImage() {
            const img = new Image()
            img.src = photoUrl(props.post.photo.public_id)
            img.onload = (event) => {
                setLoaded(true)
            }
        }
        preloadImage()
    }, [props.post.photo])

    return (
        <Card
            bodyStyle={{ padding: 0, marginBottom: "20px" }}
            bordered={false}
            loading={!loaded}
            hoverable={true}
        >
            <Layout>
                <Content>
                    <Photo cloudinaryId={props.post.photo.public_id} filter={props.post.filter} />
                </Content>

                <Sider style={{ backgroundColor: "#fff" }} width="400px">
                    <PostBody post={props.post} />
                </Sider>
            </Layout>
        </Card>
    )
}

export default Post