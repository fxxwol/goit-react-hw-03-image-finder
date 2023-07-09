import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

export default class App extends Component {
  state = {
    query: '',
  };
  handleSearch = ({ query }) => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSearch} />
        <ImageGallery query={ this.state.query} />
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}
