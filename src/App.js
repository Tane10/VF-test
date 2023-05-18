import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// fetch county and return JSON data
// {statusCode, data: Array<Records>}
// useCallback to populate Card comp
// formate response to only name object
// make it type safe
const fetchCountyByName = async (name) => {
  const baseUrl = 'https://restcountries.com/v3.1/name/';

  // await fetch(baseUrl, {});

  // return {
  //   statusCode,
  //   data
  // }
};

const handleFormSubmit = () => {};

// Form
// validation (onOnly Strings) => disable + enable button
// handle Errors
// handle submit
// clear input
// handle state change
// limit: number
const SearchByNameForm = () => {
  return (
    <div className="SearchByNameForm">
      <form onSubmit={handleFormSubmit}>
        <input
          className="SearchByNameForm-input"
          type="text"
          placeholder="Country name"
        />
        <button className="SearchByNameForm-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

// Card
// response state
const Card = ({ children }) => {
  return (
    <div className="Card">
      <>{children}</>
    </div>
  );
};

// hold
const CardContent = ({ common, official }) => {
  return (
    <div>
      <span>Common Name: {common}</span>
      <span>Official Name: {official}</span>
    </div>
  );
};

// return response on a array of card in
/**
 * <Container>
 *  res.map((r) => {
 *  return (<>
 * <Card props/> )})
 */

const App = () => {
  const [countries, setCountries] = useState([
    {
      common: 'Spain',
      official: 'Kingdom of Spain',
      nativeName: {
        spa: { official: 'Reino de España', common: 'España' },
      },
    },
    {
      common: 'Spain',
      official: 'Kingdom of Spain',
      nativeName: {
        spa: { official: 'Reino de España', common: 'España' },
      },
    },
    {
      common: 'Spain',
      official: 'Kingdom of Spain',
      nativeName: {
        spa: { official: 'Reino de España', common: 'España' },
      },
    },
  ]);

  return (
    <div className="Container">
      <Card>
        <span className="Title"> Search by county name</span>
        <SearchByNameForm />
        <div className="Content">
          {countries.map((country) => {
            return (
              <>
                <Card>
                  <CardContent details={country} />
                </Card>
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default App;
