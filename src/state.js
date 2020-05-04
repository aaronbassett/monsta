import React from 'react';
import { Stitch } from 'mongodb-stitch-browser-sdk'

const initialGlobalState = {
    server_url: process.env.REACT_APP_MONSTA_SERVER_URL,
    stitch: Stitch.initializeDefaultAppClient(process.env.REACT_APP_STITCH_APP_ID),
    posts: []
}

const GlobalStateContext = React.createContext(initialGlobalState)
const DispatchStateContext = React.createContext(undefined)

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        initialGlobalState
    )
    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    )
}

const useGlobalState = () => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext)
]

export { GlobalStateProvider, useGlobalState }