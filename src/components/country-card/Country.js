import React from "react";
import "./Country.css";
import { Link } from "react-router-dom";
import CountryDataCard from "../country-data-page/CountryDataCard";

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
    <Link state={props.data} to="/country-card" className="country-wrapper">
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
    </Link>
  );
};

export default Country;
