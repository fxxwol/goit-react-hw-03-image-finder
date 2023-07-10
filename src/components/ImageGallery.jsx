import React from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from './ImageGalleryItem'

const ImageGallery = ({gallery, onModalClick}) => {
  return (
    <div>
      <ul className="ImageGallery">
            {gallery.map(item => {
              return (
                <ImageGalleryItem
                  item={item}
                  onModalClick={onModalClick}
                  key={item.id}
                />
              );
            })}
          </ul>
    </div>
  )
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object,),
  onModalClick: PropTypes.func,
}

export default ImageGallery

