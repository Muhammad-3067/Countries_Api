import "./App.css";
import { ImStatsBars } from "react-icons/im";
import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";
import Graph from "./components/Graph";
import { RiArrowUpCircleFill } from "react-icons/ri";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [wheel, setWheel] = useState("");
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    setTimeout(fetchData, 2000);
  }, []);

  const fetchData = () => {
    const API_URL = "https://restcountries.com/v3.1/all";
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const shareData = (e) => {
    setInputValue(e.target.value);
  };

  const shareCountryData = () => {
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
    const countryData = isLoading ? (
      <img src="/images/loader.gif" alt="" />
    ) : (
      filterData
    );
    return countryData;
  };

  const scroll = (e) => {
    setScreenSize(e.pageY);
    if (e.pageY > 500) {
      setWheel(
        <div>
          <a className="arrow-up" href="#up">
            <RiArrowUpCircleFill />
          </a>
        </div>
      );
    } else {
      setWheel("");
    }
  };

  return (
    <div onWheel={scroll} className="App">
      <p style={{ position: "fixed" }}>{screenSize}</p>
      <header id="up" className="country-header">
        <h2 className="header">World Countries Data</h2>
        <p className="subtitle">Currently, we have 250 countries</p>
        <p className="satisfied-criteria">
          {shareCountryData().length < 249
            ? `${shareCountryData().length} satisfied the search criteria`
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
        <div>
          <a href="#stat">
            <ImStatsBars />
          </a>
        </div>
      </div>
      <div className="countries">{shareCountryData()}</div>
      <Graph />
      {wheel}
    </div>
  );
}

export default App;
