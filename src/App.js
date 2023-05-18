import './App.css';
import React, { useState, useCallback } from 'react';

const fetchCountyByName = async (name) => {
  let result = {
    statusCode: 200,
    data: [],
    message: '',
  };

  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.status !== 200) {
    result.statusCode = response.status;
    result.message = data.message;
  } else {
    result.data = data;
  }

  return result;
};

const SearchByNameForm = ({
  handleFormSubmitCallBack,
  handleFormResetCallBack,
}) => {
  const [countryName, setCountryName] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data, message } = await fetchCountyByName(countryName);

    if (message) {
      setError(message);
    } else {
      setError('');
    }
    handleFormSubmitCallBack(data);
  };

  const handleFormReset = async (e) => {
    e.preventDefault();
    setCountryName('');
    handleFormResetCallBack();
  };

  const handleOnChangeInput = (value) => {
    // only allow string
    if (!/[0-9]/.test(value)) {
      setCountryName(value);
    }
  };

  return (
    <div className="SearchByNameForm">
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <input
          className="SearchByNameForm-input"
          type="text"
          placeholder="Country name"
          required
          value={countryName}
          onChange={(e) => handleOnChangeInput(e.target.value)}
        />
        <button
          className="SearchByNameForm-primary"
          type="submit"
          disabled={!countryName}
        >
          Submit
        </button>
        <button className="SearchByNameForm-secondary" type="reset">
          reset
        </button>

        <div>
          <span className="Error">{error}</span>
        </div>
      </form>
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <div className="Card">
      <>{children}</>
    </div>
  );
};

const CardGroup = ({ props }) => {
  const listItems = props.map((country, index) => (
    <li key={index} className="CardGroup-li">
      <Card key={index}>
        <CardContent props={country} />
      </Card>
    </li>
  ));

  const wrappedListItems = [];
  for (let i = 0; i < listItems.length; i += 3) {
    const sublist = listItems.slice(i, i + 3);
    wrappedListItems.push(
      <ul key={i} className="CardGroup-ul">
        {sublist}
      </ul>
    );
  }

  return <div className="CardGroup">{wrappedListItems}</div>;
};

const CardContent = ({ props }) => {
  const {
    name: { common, official, nativeName: nativeNameObject },
  } = props;

  const key = Object.keys(nativeNameObject)[0];
  const nativeName = nativeNameObject[key]['official'];

  return (
    <div>
      <div className="CardContent-div">
        <span>Common Name:</span>
        <span className="CardContent-text"> {common}</span>
      </div>
      <div className="CardContent-div">
        <span>Official Name:</span>
        <span className="CardContent-text">{official}</span>
      </div>
      <div className="CardContent-div">
        <span>Native Name:</span>
        <span className="CardContent-text">{nativeName}</span>
      </div>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState(null);

  const onHandleFormSubmitCallBack = useCallback((fetchedCountries) => {
    setCountries(fetchedCountries);
  }, []);

  const onHandleFormResetCallBack = useCallback(() => {
    setCountries([]);
  }, []);

  return (
    <div className="Container">
      <Card>
        <span className="Title"> Search by county name</span>
        <SearchByNameForm
          handleFormSubmitCallBack={onHandleFormSubmitCallBack}
          handleFormResetCallBack={onHandleFormResetCallBack}
        />
        <div className="Content">
          {countries && <CardGroup props={countries} />}
        </div>
      </Card>
    </div>
  );
};

export default App;
