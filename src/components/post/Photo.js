import React from 'react'
import ImageFilter from 'react-image-filter'
import filters from './Filters'
import defaultPhoto from '../../static/images/default-photo.png'

function photoUrl(cloudinaryId) {
    return `${process.env.REACT_APP_CLOUDINARY_IMAGE_URL}${cloudinaryId}`
}

function Photo(props) {

    const imageUrl = (props.cloudinaryId) ? photoUrl(props.cloudinaryId) : defaultPhoto

    return (
        <ImageFilter
            image={imageUrl}
            filter={filters[props.filter]}
            style={{ width: props.width, height: props.height }}
        />
    )
}

Photo.defaultProps = {
    filter: 'Default',
    width: 500,
    height: 500
}

export default Photo
export { photoUrl }