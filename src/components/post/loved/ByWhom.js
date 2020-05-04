import React from 'react'
import _ from 'lodash'

import { useGlobalState } from '../../../state'
import { CountOnly, Nobody, OnlyUser, OnlyOne, UserAndAnother, UserAndMultipleOthers, Others } from './Messages'


function ByWhom(props) {
    const [state] = useGlobalState()
    const lovedByCount = _.keys(props.lovedBy).length

    if (lovedByCount === 0) {
        if (props.initialLoveCount > 0) {
            return <CountOnly count={props.initialLoveCount} />
        } else {
            return <Nobody />
        }
    } else if (lovedByCount === 1) {
        if (state.stitch.auth.isLoggedIn && state.stitch.auth.user.id in props.lovedBy) {
            return <OnlyUser />
        } else {
            return <OnlyOne lovedBy={props.lovedBy} />
        }
    } else {
        if (state.stitch.auth.isLoggedIn && state.stitch.auth.user.id in props.lovedBy) {
            if (lovedByCount === 2) {
                return <UserAndAnother currentUser={state.stitch.auth.user.id} lovedBy={props.lovedBy} lovedByCount={lovedByCount} />
            } else {
                return <UserAndMultipleOthers currentUser={state.stitch.auth.user.id} lovedBy={props.lovedBy} lovedByCount={lovedByCount} />
            }
        } else {
            return <Others lovedBy={props.lovedBy} lovedByCount={lovedByCount} />
        }
    }
}

export default ByWhom