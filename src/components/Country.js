import React from "react";
import "./css/Country.css";

const Country = (props) => {
  const {
    capital,
    name: { common },
    currencies,
    languages,
    population,
    flags: { png },
  } = props.data;

  const displayLanguages = (language) => {
    let sumLang = [];
    for (let lang in language) {
      sumLang.push(language[lang]);
    }
    return sumLang.join(", ");
  };

  const displayCurrencies = (currency) => {
    let sumCurrency = [];
    for (let cur in currency) {
      sumCurrency.push(currencies[cur].name, currencies[cur].symbol);
    }
    return sumCurrency.join(": ");
  };
  return (
    <div className="country-wrapper">
      <div className="img-card">
        <img className="flag" src={png} alt="" />
      </div>
      <h1 className="name">{common}</h1>
      <h2>
        Capital: <span>{capital}</span>
      </h2>
      <h2>
        Languages: <span>{displayLanguages(languages)}</span>
      </h2>
      <h2>
        Population: <span>{population}</span>
      </h2>
      <h2>
        Currency: <span>{displayCurrencies(currencies)}</span>
      </h2>
    </div>
  );
};

export default Country;
