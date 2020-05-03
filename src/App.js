import React from 'react';
import { Layout } from 'antd';

import { GlobalStateProvider } from './state'
import { MonstaBody, MonstaHeader, MonstaFooter } from './components/monsta'
import PostCreate from './components/post/PostCreate'


function App() {
    return (
        <GlobalStateProvider>
            <Layout className="layout">
                <MonstaHeader />
                <MonstaBody />
                <MonstaFooter />
            </Layout >
            <PostCreate />
        </GlobalStateProvider>
    )
}

export default App;
