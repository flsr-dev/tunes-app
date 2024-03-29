import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { search } from '../services/iTunes';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchButtonDisabled, setIsSearchDisabled] = useState(true);
  const [searchEntity, setSearchEntity] = useState(null);
  const [resultAmount, setResultAmount] = useState('');
  const [resultData, setResultData] = useState('');

  useEffect(() => {
    const checkFieldsValidity = () => {
      const isSearchInvalid = searchTerm?.length === 0;
      return setIsSearchDisabled(isSearchInvalid);
    };
    checkFieldsValidity();
  }, [searchTerm]);

  const handleInputChange = ({ target: { value } }, changeStateFunc) => (
    changeStateFunc(value));

  const handleRadioClick = ({ target: { value } }) => setSearchEntity(value);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const { data: { resultCount, results } } = await search(searchTerm, searchEntity);
    setResultData(results);
    setResultAmount(resultCount);
  };

  return (
    <>
      <Header />
      <main>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="artistType">
            <input
              type="radio"
              name="searchType"
              id="artistType"
              value="musicArtist"
              onChange={handleRadioClick}
              checked={searchEntity === 'musicArtist'}
            />
            Artista
          </label>
          <label htmlFor="albumType">
            <input
              type="radio"
              name="searchType"
              id="albumType"
              value="album"
              onChange={handleRadioClick}
              checked={searchEntity === 'album'}
            />
            Álbum
          </label>
          <label htmlFor="musicType">
            <input
              type="radio"
              name="searchType"
              id="musicType"
              value="musicTrack"
              onChange={handleRadioClick}
              checked={searchEntity === 'musicTrack'}
            />
            Música
          </label>
          <input
            type="text"
            name="searchField"
            aria-label="search field"
            value={searchTerm}
            onChange={(event) => handleInputChange(event, setSearchTerm)}
          />
          <button
            type="submit"
            disabled={isSearchButtonDisabled}
            onSubmit={onFormSubmit}
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
}
