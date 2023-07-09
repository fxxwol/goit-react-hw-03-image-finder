import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

export default class App extends Component {
  state = {
    query: '',
    showModal: false,
    selectedImg: {}
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
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearch} />
        <ImageGallery
          query={this.state.query}
          onModalClick={this.toggleModal}
        />
        {this.state.showModal && <Modal img={ this.state.selectedImg} toggleModal={this.toggleModal} />}
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}
