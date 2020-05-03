import React from 'react'
import Pluralize from 'react-pluralize'
import _ from 'lodash'

import { useGlobalState } from '../../../state'
import UserLink from '../../user/UserLink'


function ByWhom(props) {
    const [state] = useGlobalState()
    const stitch = state.stitch
    const lovedByCount = _.keys(props.lovedBy).length

    const CountOnly = (props) => {
        return (
            <>
                <b>{props.count}</b>&nbsp;
                <Pluralize singular={'person'} count={props.count} showCount={false} /> loved this
            </>
        )
    }

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
                Loved by <b><UserLink id={_.keys(props.lovedBy)[0]} name={_.values(props.lovedBy)[0]} /></b>
            </>
        )
    }

    const UserAndAnother = (props) => {
        const { [stitch.auth.user.id]: _, ...otherUser } = props.lovedBy

        return (
            <>
                <b>You</b> and <b><UserLink id={_.keys(otherUser)[0]} name={_.values(otherUser)[0]} /></b> love this
            </>
        )
    }

    const UserAndMultipleOthers = (props) => {
        const { [stitch.auth.user.id]: _, ...otherUsers } = props.lovedBy
        const randomOtherUserKey = _.sample(_.keys(otherUsers))
        return (
            <>
                Loved by <b>You</b>,&nbsp;
                <b><UserLink id={randomOtherUserKey} name={props.lovedBy[randomOtherUserKey]} /></b>&nbsp;
                and <b>{lovedByCount - 2}</b>&nbsp;
                <Pluralize singular={'other'} count={lovedByCount - 2} showCount={false} />
            </>
        )
    }

    const Others = (props) => {
        const randomUserKey = _.sample(_.keys(props.lovedBy))

        return (
            <>
                Loved by&nbsp;
                <b><UserLink id={randomUserKey} name={props.lovedBy[randomUserKey]} /></b>&nbsp;
                and <b>{lovedByCount - 1}</b>&nbsp;
                <Pluralize singular={'other'} count={lovedByCount - 1} showCount={false} />
            </>
        )
    }

    if (lovedByCount === 0) {
        if (props.initialLoveCount > 0) {
            return <CountOnly count={props.initialLoveCount} />
        } else {
            return <Nobody />
        }
    } else if (lovedByCount === 1) {
        if (stitch.auth.isLoggedIn && stitch.auth.user.id in props.lovedBy) {
            return <OnlyUser />
        } else {
            return <OnlyOne lovedBy={props.lovedBy} />
        }
    } else {
        if (stitch.auth.isLoggedIn && stitch.auth.user.id in props.lovedBy) {
            if (lovedByCount === 2) {
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