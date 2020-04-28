import React from 'react'
import Pluralize from 'react-pluralize'
import _ from 'lodash'

import { useGlobalState } from '../../../state'
import UserLink from '../../user/UserLink'


function ByWhom(props) {
    const [state] = useGlobalState()

    const Nobody = () => {
        return (
            <>
                <b>Nobody</b> has loved this yet
            </>
        )
    }

    const OnlyUser = () => {
        return (
            <>
                <b>You</b> love this
            </>
        )
    }

    const OnlyOne = (props) => {
        return (
            <>
                Loved by <b><UserLink user={props.lovedBy[0]} /></b>
            </>
        )
    }

    const UserAndAnother = (props) => {
        const otherUser = _.remove([...props.lovedBy], (x) => x !== state.currentUser.username)[0]

        return (
            <>
                <b>You</b> and <b><UserLink user={otherUser} /></b> love this
            </>
        )
    }

    const UserAndMultipleOthers = (props) => {
        const otherUsers = _.remove([...props.lovedBy], (x) => x !== state.currentUser.username)
        return (
            <>
                Loved by <b>You</b>,&nbsp;
                <b><UserLink user={_.sample(otherUsers)} /></b>&nbsp;
                and <b>{props.lovedBy.length - 2}</b>&nbsp;
                <Pluralize singular={'other'} count={props.lovedBy.length - 2} showCount={false} />
            </>
        )
    }

    const Others = (props) => {
        return (
            <>
                Loved by&nbsp;
                <b><UserLink user={_.sample(props.lovedBy)} /></b>&nbsp;
                and <b>{props.lovedBy.length - 1}</b>&nbsp;
                <Pluralize singular={'other'} count={props.lovedBy.length - 1} showCount={false} />
            </>
        )
    }

    if (props.lovedBy.length === 0) {
        return <Nobody />
    } else if (props.lovedBy.length === 1) {
        if (props.lovedBy.includes(state.currentUser.username)) {
            return <OnlyUser />
        } else {
            return <OnlyOne lovedBy={props.lovedBy} />
        }
    } else {
        if (props.lovedBy.includes(state.currentUser.username)) {
            if (props.lovedBy.length === 2) {
                return <UserAndAnother lovedBy={props.lovedBy} />
            } else {
                return <UserAndMultipleOthers lovedBy={props.lovedBy} />
            }
        } else {
            return <Others lovedBy={props.lovedBy} />
        }
    }
}

export default ByWhom