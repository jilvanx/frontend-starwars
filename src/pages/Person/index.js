import React from 'react';
import PropTypes from 'prop-types';

import Starship from '../Starships';

export default function Person({ people }) {
  return (
    <div className="row columns is-multiline">
      {people &&
        people.map((person) => (
          <div key={person.name} className="column is-one-third">
            <div className="card large round">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-96x96">
                      <img src={person.image} alt={person.name} />
                    </figure>
                  </div>
                  <div className="">
                    <p className="title is-5">{person.name}</p>
                    <p>
                      <span className="subtitle is-6">
                        Height: <strong>{person.height}</strong>
                      </span>
                    </p>
                    <p>
                      <span className="subtitle is-6">
                        Mass: <strong>{person.mass}</strong>
                      </span>
                    </p>
                    <p>
                      <span className="subtitle is-6">
                        Birth Year: <strong>{person.birth_year}</strong>
                      </span>
                    </p>
                    <p>
                      <span className="subtitle is-6">
                        Gender: <strong>{person.gender}</strong>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="painel">
                  <p className="title is-5 has-text-centered">
                    <strong>Starships</strong>
                  </p>
                  {!person.starships ? (
                    <p className="has-text-centered">Loading ... </p>
                  ) : (
                    ''
                  )}
                  {person.starships.length > 0 ? (
                    <Starship starships={person.starships} />
                  ) : (
                    <p className="has-text-centered">No starship</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

Person.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      mass: PropTypes.string.isRequired,
      birth_year: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      starships: PropTypes.array,
    })
  ).isRequired,
};
