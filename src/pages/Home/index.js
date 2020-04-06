import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Paginator from 'react-hooks-paginator';
import { toast } from 'react-toastify';

import { Wrapper } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import Person from '../Person';

import { apiPeople, apiStarWarsImages } from '../../services/api';

export default function Home() {
  const [people, setPeople] = useState();
  const [loading, setLoading] = useState(false);
  const [searchPerson, SetSearchPerson] = useState('');
  const isLoading = loading ? 'is-loading' : '';
  const [isSeachPerson, SetIsSeachPerson] = useState(false);
  const [message, setMessage] = useState();

  // Pagination
  const pageLimit = 10;
  const [, setOffset] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadPage(page) {
    setLoading(true);
    window.scrollTo(0, 0);

    const [peopleAPI, peopleImageAPI] = await Promise.all([
      apiPeople
        .get(`/?page=${page}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          toast.error(`API StarWars ${err}`);
        }),

      apiStarWarsImages
        .get()
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          toast.error(`API StarWars ${err}`);
        }),
    ]);

    peopleAPI.results.forEach((person) => {
      peopleImageAPI.forEach((image) => {
        if (person.name === image.name) {
          person.image = image.image;
        }
      });
    });

    setTotalPeople(peopleAPI.count);
    setPeople(peopleAPI.results);

    setLoading(false);
  }

  function handleInputChange(e) {
    SetSearchPerson(e.target.value);
    if (!e.target.value) {
      loadPage(currentPage);
      SetIsSeachPerson(false);
      setMessage();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchPerson) {
      setLoading(true);
      if (searchPerson) {
        try {
          const { data } = await apiPeople.get(`/?search=${searchPerson}`);
          const { data: dataImage } = await apiStarWarsImages.get();

          data.results.forEach((person) => {
            dataImage.forEach((image) => {
              if (person.name === image.name) {
                person.image = image.image;
              }
            });
          });

          if (data.results.length === 0) {
            setMessage('No results found!');
          }

          SetIsSeachPerson(true);
          setPeople(data.results);
          setLoading(false);
        } catch (err) {
          toast.error(`API StarWars 😱 ${err}`);
          setLoading(false);
          SetIsSeachPerson(false);
        }
      }
    }
  }

  useEffect(() => {
    async function startPage() {
      setPeople();
    }

    startPage();
    loadPage(currentPage);
  }, [currentPage]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="section">
          {/* search box */}
          <div className="box">
            <form className="field has-addons" onSubmit={handleSubmit}>
              <div className="control is-expanded">
                <input
                  className="input has-text-centered"
                  type="search"
                  placeholder="find a star wars character"
                  value={searchPerson}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="control">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`button is-dark ${isLoading}`}>
                  Search
                </button>
              </div>
            </form>
          </div>
          {/* end search box */}
          {/* list people */}
          {loading ? (
            <Loading loading={!!loading}>
              <FaSpinner size={64} />
            </Loading>
          ) : (
            ''
          )}
          <p className="has-text-centered">{message}</p>
          {people ? <Person people={people} /> : ''}
          {/* end list people */}
        </div>
        {/* end section */}
      </div>
      <Wrapper className={loading || isSeachPerson ? 'is-hidden' : ''}>
        <Paginator
          disabled
          totalRecords={totalPeople}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Wrapper>

      <Footer />
    </>
  );
}
