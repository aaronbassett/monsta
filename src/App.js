import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from 'antd';

import { GlobalStateProvider } from './state'
import { MonstaBody, MonstaHeader, MonstaFooter } from './components/monsta'
import PostCreate from './components/post/PostCreate'
import PostDetail from './components/post/detail/PostDetail'


function App() {
    return (
        <GlobalStateProvider>
            <Router>
                <Layout className="layout">
                    <MonstaHeader />
                    <Switch>
                        <Route path={`/p/:postId`}>
                            <PostDetail />
                        </Route>
                        <Route path="/">
                            <MonstaBody />
                        </Route>
                    </Switch>
                    <MonstaFooter />
                </Layout >
                <PostCreate />
            </Router>
        </GlobalStateProvider>
    )
}

export default App;
