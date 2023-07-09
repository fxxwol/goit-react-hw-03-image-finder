import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item: { tags, webformatURL }}) => {
  return (
      <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        loading="lazy"
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
