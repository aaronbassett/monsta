import React from 'react'
import Pluralize from 'react-pluralize'
import _ from 'lodash'

import UserLink from '../../user/UserLink'


export const CountOnly = (props) => {
    return (
        <>
            <b>{props.count}</b>&nbsp;
            <Pluralize singular={'person'} count={props.count} showCount={false} /> loved this
        </>
    )
}

export const Nobody = () => {
    return (
        <>
            <b>Nobody</b> has loved this yet
        </>
    )
}

export const OnlyUser = () => {
    return (
        <>
            <b>You</b> love this
        </>
    )
}

export const OnlyOne = (props) => {
    return (
        <>
            Loved by <b><UserLink userId={_.keys(props.lovedBy)[0]} username={_.values(props.lovedBy)[0]} /></b>
        </>
    )
}

export const UserAndAnother = (props) => {
    const { [props.currentUser]: x, ...otherUser } = props.lovedBy

    return (
        <>
            <b>You</b> and <b><UserLink userId={_.keys(otherUser)[0]} username={_.values(otherUser)[0]} /></b> love this
        </>
    )
}

export const UserAndMultipleOthers = (props) => {
    const { [props.currentUser]: x, ...otherUsers } = props.lovedBy
    const randomOtherUserKey = _.sample(_.keys(otherUsers))
    return (
        <>
            Loved by <b>You</b>,&nbsp;
            <b><UserLink userId={randomOtherUserKey} username={props.lovedBy[randomOtherUserKey]} /></b>&nbsp;
            and <b>{props.lovedByCount - 2}</b>&nbsp;
            <Pluralize singular={'other'} count={props.lovedByCount - 2} showCount={false} />
        </>
    )
}

export const Others = (props) => {
    const randomUserKey = _.sample(_.keys(props.lovedBy))

    return (
        <>
            Loved by&nbsp;
            <b><UserLink userId={randomUserKey} username={props.lovedBy[randomUserKey]} /></b>&nbsp;
            and <b>{props.lovedByCount - 1}</b>&nbsp;
            <Pluralize singular={'other'} count={props.lovedByCount - 1} showCount={false} />
        </>
    )
}
