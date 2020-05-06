import React, { useState, useEffect } from 'react'
import { Layout, Card } from 'antd'
import { Link } from 'react-router-dom'
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
                    <Link to={`/p/${props.post._id}`}>
                        <Photo cloudinaryId={props.post.photo.public_id} filter={props.post.filter} />
                    </Link>
                </Content>

                <Sider style={{ backgroundColor: "#fff" }} width="400px">
                    <PostBody post={props.post} />
                </Sider>
            </Layout>
        </Card>
    )
}

export default Post