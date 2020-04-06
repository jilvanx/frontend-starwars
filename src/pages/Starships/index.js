import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { apiStarShips } from '../../services/api';

const Starship = ({ starships }) => {
  const [starship, setStarship] = useState([]);

  async function loadStarship(starshipsArray) {
    const startshipArr = [];
    if (starshipsArray.length > 0) {
      Promise.all(starshipsArray.map((uri) => apiStarShips.get(`${uri}`))).then(
        (value) => {
          value.forEach((result) => {
            startshipArr.push({
              name: result.data.name,
              model: result.data.model,
              crew: result.data.crew,
              passengers: result.data.passengers,
              starship_class: result.data.starship_class,
            });
          });
          setStarship(startshipArr);
        }
      );
    }
  }

  useEffect(() => {
    if (starships) {
      loadStarship(starships);
    }
  }, [starships]);

  return (
    <ul>
      {starship.map((starshipItem, index) => (
        <li key={index.toString()}>
          <p>
            <strong>Name:</strong> {starshipItem.name}
          </p>
          <p>
            <strong>Model:</strong> {starshipItem.model}
          </p>
          <p>
            <strong>Crew:</strong> {starshipItem.crew}
          </p>
          <p>
            <strong>Passengers:</strong> {starshipItem.passengers}
          </p>
          <p>
            <strong>Class:</strong> {starshipItem.starship_class}
          </p>
        </li>
      ))}
    </ul>
  );
};

Starship.defaultProps = {
  starships: [],
};

Starship.propTypes = {
  starships: PropTypes.arrayOf(PropTypes.string),
};

export default Starship;
