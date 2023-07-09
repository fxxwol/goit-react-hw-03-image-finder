import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item, onModalClick }) => {
  const { tags, webformatURL } = item;

  const handleClick = () => {
    onModalClick(item);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        loading="lazy"
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
  onModalClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
