import React from 'react'
import ImageFilter from 'react-image-filter'
import filters from './Filters'
import defaultPhoto from '../../static/images/default-photo.png'

function Photo(props) {

    return (
        <ImageFilter
            image={props.photo.src}
            filter={filters[props.photo.filter]}
            style={{ width: "500px", height: "500px" }}
        />
    )
}

Photo.defaultProps = {
    src: defaultPhoto,
    filter: 'Default'
}

export default Photo