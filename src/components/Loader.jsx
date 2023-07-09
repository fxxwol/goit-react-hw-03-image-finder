import React from 'react';
import { Dna } from 'react-loader-spinner';

const Loader = ({ size, top}) => {
  return (
    <Dna
      visible={true}
      height='100'
      width='100'
      ariaLabel="dna-loading"
      wrapperStyle={{ position: 'absolute', top: '50%', right: '50%' }}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Loader;
