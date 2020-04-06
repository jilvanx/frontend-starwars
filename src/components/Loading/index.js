import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function Loading({ loading }) {
  if (loading) {
    return (
      <Container loading={loading ? 1 : 0}>
        <FaSpinner size={64} />
      </Container>
    );
  }
  return <div />;
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
