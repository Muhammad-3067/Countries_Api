import React, { useState } from "react";
import "./Graph.css";
import tenHighestPopulation from "./data/MostHighestPopulation";
import tenMostSpokenLanguages from "./data/MostSpokenLang";

// ! 1.Make a bar group of world countries populations

// * This component writes the specific item to a DOM
const CountryPopulation = (props) => {
  const { country, population } = props.countryObj;
  let strPopulation = population.toString();
  let populate = [];
  if (strPopulation.length > 9) {
    for (let i = 0; i < 3; i++) {
      populate.push(strPopulation[i]);
    }
  }
  if (strPopulation.length <= 9) {
    for (let i = 0; i < 2; i++) {
      populate.push(strPopulation[i]);
    }
  }
  let textPopulate = populate.join("");

  return (
    <div className="bar-group">
      <h3 className="bar-country">{country}</h3>
      <div className="bar" style={{ width: `${textPopulate}px` }}></div>
      <h3 className="bar-population">{strPopulation}</h3>
    </div>
  );
};

const CountryLanguage = (props) => {
  const { country, language } = props.countryObj;

  return (
    <div className="bar-group">
      <h3 className="bar-country">{language}</h3>
      <div className="bar" style={{ width: `${country * 7}px` }}></div>
      <h3 className="bar-population">{country}</h3>
    </div>
  );
};

const WorldPopulations = ({ tenHighestPopulation }) => {
  const countryCount = tenHighestPopulation.map((countryObj, index) => (
    <CountryPopulation key={index} countryObj={countryObj} />
  ));
  return <div>{countryCount}</div>;
};

const WorldLanguages = ({ tenMostSpokenLanguages }) => {
  const countryCount = tenMostSpokenLanguages.map((countryObj, index) => (
    <CountryLanguage key={index} countryObj={countryObj} />
  ));
  return <div>{countryCount}</div>;
};

const Graph = () => {
  const [displayGraph, setDisplayGraph] = useState("");
  const [text, setText] = useState("10 Most populated countries in the world");
  const displayCountryData = (e) => {
    if (e.target.innerText === "Languages") {
      setDisplayGraph(
        <WorldLanguages tenMostSpokenLanguages={tenMostSpokenLanguages} />
      );
      setText("10 Most spoken languages in the world");
    } else {
      setDisplayGraph(
        <WorldPopulations tenHighestPopulation={tenHighestPopulation} />
      );
      setText("10 Most populated countries in the world");
    }
  };

  return (
    <div id="stat" className="bar-container">
      <header className="container-header">
        <div className="buttons">
          <button onClick={displayCountryData}>Population</button>
          <button onClick={displayCountryData}>Languages</button>
        </div>
        <h2>{text}</h2>
      </header>
      <div className="graphs">
        <div className="bar-wrapper">
          <div className="colors">
            {displayGraph ? (
              displayGraph
            ) : (
              <WorldPopulations tenHighestPopulation={tenHighestPopulation} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
