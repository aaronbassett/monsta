import React from 'react';

const initialGlobalState = {
    server_url: process.env.REACT_APP_MONSTA_SERVER_URL,
    currentUser: {
        'username': 'aaronbassett',
        'avatar': 'https://gravatar.com/avatar/309287088ccfe196428a5dbe2b051c48?s=200&d=mp&r=pg'
    }
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