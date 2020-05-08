import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { PageHeader, Tag, Statistic, Layout, Row, Col } from 'antd'
import { PictureTwoTone, MessageTwoTone, HeartTwoTone, FireTwoTone } from '@ant-design/icons'
import axios from 'axios'
import PostList from '../post/PostList'
import { useGlobalState } from '../../state'

const { Content } = Layout

function UserDetail() {
    let { userId } = useParams()
    let history = useHistory()
    const [state] = useGlobalState()
    const [postCount, setPostCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const [loveCount, setLoveCount] = useState(0)

    useEffect(() => {
        async function fetchUserStats() {
            const response = await axios.get(`${state.server_url}/user/${userId}`)
            const data = await response.data
            const { postsMade, lovedReceived, commentsReceived } = data[0]
            setPostCount((postsMade[0]) ? postsMade[0].total : 0)
            setCommentCount((commentsReceived[0]) ? commentsReceived[0].total : 0)
            setLoveCount((lovedReceived[0]) ? lovedReceived[0].total : 0)
        }
        fetchUserStats()
    })

    return (
        <Content style={{ padding: '0 50px', marginTop: "50px" }}>
            <Row justify="center">
                <Col flex="900px">
                    <PageHeader
                        title="All posts by user"
                        ghost={false}
                    >
                        <Row>
                            <Statistic
                                title="Posts"
                                prefix={<PictureTwoTone twoToneColor="#589636" style={{ marginRight: 5 }} />}
                                value={postCount}
                                style={{
                                    marginRight: 35
                                }}
                            />
                            <Statistic
                                title="Comments"
                                prefix={<MessageTwoTone twoToneColor="#006994" style={{ marginRight: 5 }} />}
                                value={commentCount}
                                style={{
                                    marginRight: 35
                                }}
                            />
                            <Statistic
                                title="Love"
                                prefix={<HeartTwoTone twoToneColor="#e25822" style={{ marginRight: 5 }} />}
                                value={loveCount}
                            />
                        </Row>
                    </PageHeader>


                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 50 }}>
                <Col flex="900px">
                    <PostList userId={userId} />
                </Col>
            </Row>
        </Content>
    )
}

export default UserDetail