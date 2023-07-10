import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { fetchImg } from 'service/fetchImg';
import Loader from './Loader';
import Button from './Button';

export default class App extends Component {
  state = {
    gallery: [],
    page: 1,
    totalPages: 1,
    error: null,
    status: 'idle',
    query: '',
    showModal: false,
    selectedImg: {},
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const currentQuery = this.state.query;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending', page: 1 });
      this.getData(1);
    }
  }

  getData = async page => {
    try {
      const data = await fetchImg(this.state.query, page);
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
      const data = await fetchImg(this.state.query, currentPage);
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

  handleSearch = ({ query }) => {
    this.setState({ query });
  };

  toggleModal = image => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImg: image,
    }));
  };

  render() {
    const { status, page, totalPages, error, gallery, showModal, selectedImg } =
      this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearch} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <>
            <ImageGallery gallery={gallery} onModalClick={this.toggleModal} />
            {!(page === totalPages) && <Button onClick={this.loadMore} />}
          </>
        )}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {showModal && (
          <Modal img={selectedImg} toggleModal={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}
