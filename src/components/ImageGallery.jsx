import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImg } from 'service/fetchImg';
import Loader from '../components/Loader';
import ImageGalleryItem from './ImageGalleryItem';

export default class ImageGallery extends Component {
    static propTypes = {
      query: PropTypes.string.isRequired,
    }
  static BASE_URL = 'https://pixabay.com/api/';
  state = {
    gallery: [],
    error: null,
    status: 'idle',
  };

  async getData(query, page) {
    try {
      const data = await fetchImg(query, page);
      this.setState({
        status: 'resolved',
        gallery: data.hits,
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  }
  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending' });
      this.getData(currentQuery, 1);
    }
  }
  render() {
    const { status, gallery } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {gallery.map(item => (
            <ImageGalleryItem item={item} key={item.id}/>
          ))}
        </ul>
      );
    }
    if (status === 'rejected') {
      return (
        <p>
          Sorry, there are no images matching your search query. Please try
          again :/
        </p>
      );
    }
  }
}
