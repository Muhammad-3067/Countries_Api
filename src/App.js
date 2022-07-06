import "./App.css";
import { ImStatsBars } from "react-icons/im";
import { useEffect, useState } from "react";
import Country from "./components/country-card/Country";
import Graph from "./components/graph/Graph";
// import { RiArrowUpCircleFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "./redux/country/countrySlice";

function App() {
  const [inputValue, setInputValue] = useState("");
  // const [wheel, setWheel] = useState("");
  // const [screenSize, setScreenSize] = useState(0);
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const shareData = (e) => {
    setInputValue(e.target.value);
  };

  const shareCountryData = () => {
    const filterData = countries
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

    // ! loader
    const countryData = (
      <div className="countries">
        {status === "loading" ? (
          <img src="/images/loader.gif" alt="" />
        ) : (
          filterData
        )}
        {error && (
          <h2 className="card-error-msg">An error occured: Server Error</h2>
        )}
      </div>
    );

    return countryData;
  };

  // const scroll = (e) => {
  //   setScreenSize(e.pageY);
  //   if (e.pageY > 500) {
  //     setWheel(
  //       <div>
  //         <a className="arrow-up" href="#up">
  //           <RiArrowUpCircleFill />
  //         </a>
  //       </div>
  //     );
  //   } else {
  //     setWheel("");
  //   }
  // };
  // onWheel={scroll}
  // {wheel}
  return (
    <div className="App">
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
        <div className="stats">
          <a href="#stat">
            <ImStatsBars />
          </a>
        </div>
      </div>
      <div>{shareCountryData()}</div>
      <Graph />
    </div>
  );
}

export default App;
