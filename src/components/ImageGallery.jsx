import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImg } from 'service/fetchImg';
import Loader from '../components/Loader';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';

export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onModalClick: PropTypes.func.isRequired,
  };

  state = {
    gallery: [],
    page: 1,
    totalPages: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending' });
      this.getData(1);
    }

    if (prevState.gallery !== this.state.gallery) {
      this.isLoading = true;
    }
  }

  getData = async page => {
    try {
      const data = await fetchImg(this.props.query, page);
      if (!data.total) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState({
        status: 'resolved',
        gallery: data.hits,
        totalPages: Math.ceil(data.totalHits / 12),
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  loadMore = async () => {
    const currentPage = this.state.page + 1;
    try {
      const data = await fetchImg(this.props.query, currentPage);
      if (currentPage > this.state.totalPages) {
        return;
      }
      this.setState(prev => ({
        page: currentPage,
        gallery: prev.gallery.concat(data.hits),
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { status, gallery, page, totalPages, error } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {gallery.map(item => {
              return (
                <ImageGalleryItem
                  item={item}
                  onModalClick={this.props.onModalClick}
                  key={item.id}
                />
              );
            })}
          </ul>
          {!(page === totalPages) && <Button onClick={this.loadMore} />}
        </>
      );
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
  }
}
