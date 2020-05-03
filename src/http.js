import axios from 'axios'

function createHttpClient(state) {
    let instance = null

    if (state.stitch.auth.isLoggedIn) {
        instance = axios.create({
            baseURL: state.server_url,
            headers: {
                "x-stitch-username": state.stitch.auth.user.profile.name,
                "x-stitch-user-id": state.stitch.auth.user.id
            }
        })
    } else {
        instance = axios.create({
            baseURL: state.server_url
        })
    }

    return instance
}

export default createHttpClient