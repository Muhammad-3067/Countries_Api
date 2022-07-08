import "./Main.css";
import { ImStatsBars } from "react-icons/im";
import { useEffect, useState } from "react";
import Country from "../country-card/Country";
import Graph from "../graph/Graph";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "../../redux/country/countrySlice";
import { COUNTRIES_ACTION, LOADING } from "../action-keys/Actions";

function Main() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.country);
  sessionStorage.setItem(COUNTRIES_ACTION, JSON.stringify(countries));
  sessionStorage.setItem(LOADING, true);

  const sessionStorageData = () => {
    const stored = sessionStorage.getItem(COUNTRIES_ACTION);
    return JSON.parse(stored);
  };

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const shareData = (e) => {
    setInputValue(e.target.value);
  };

  // const sessionStorageLoading = sessionStorage.getItem(LOADING);
  sessionStorage.setItem(LOADING, false);

  const shareCountryData = (data) => {
    const filterData = data
      .filter((country) => {
        const searchTerm = inputValue.toLowerCase();
        const countryName = country.name.common.toString().toLowerCase();
        const countryCapital =
          country.capital !== undefined
            ? country.capital.toString().toLowerCase()
            : "";
        const countryLanguage = [];
        for (let lang in country.languages) {
          countryLanguage.push(country.languages[lang]);
        }
        const arrayLanguages = countryLanguage.toString().toLowerCase();
        if (searchTerm === "") {
          return country;
        } else if (countryName.includes(searchTerm)) {
          return country;
        }
        if (countryCapital.includes(searchTerm)) {
          return country;
        }
        if (arrayLanguages.includes(searchTerm)) {
          return country;
        }
      })
      .map((country, index) => <Country key={index} data={country} />);

    return filterData;
  };
  const countryShareData = shareCountryData(sessionStorageData());

  return (
    <div className="main">
      <header id="up" className="country-header">
        <h2 className="header">World Countries Data</h2>
        <p className="subtitle">Currently, we have 250 countries</p>
        <p className="satisfied-criteria">
          {countryShareData.length < 249 && countryShareData.length > 0
            ? `${countryShareData.length} satisfied the search criteria`
            : ""}
        </p>
      </header>
      <div className="controls">
        <input
          className="search-input"
          type="text"
          onChange={shareData}
          placeholder="Search countries by name, city and languages"
        />
        <div className="stats">
          <a href="#stat">
            <ImStatsBars />
          </a>
        </div>
      </div>
      <div>
        <div className="countries">
          {sessionStorage.getItem(LOADING) === true ? (
            <img src="/images/loader.gif" alt="" />
          ) : (
            countryShareData
          )}
          {error && (
            <h2 className="card-error-msg">An error occured: Server Error</h2>
          )}
        </div>
      </div>
      <Graph />
    </div>
  );
}

export default Main;
