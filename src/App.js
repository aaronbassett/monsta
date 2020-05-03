import React from 'react';
import { Layout } from 'antd';

import { GlobalStateProvider } from './state'
import { MonstaBody, MonstaHeader, MonstaFooter } from './components/monsta'


function App() {
    return (
        <GlobalStateProvider>
            <Layout className="layout">
                <MonstaHeader />
                <MonstaBody />
                <MonstaFooter />
            </Layout >
        </GlobalStateProvider>
    )
}

export default App;
