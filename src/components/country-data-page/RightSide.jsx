import React from "react";

const RightSide = (props) => {
  const {
    area,
    borders,
    capital,
    car,
    continents,
    currencies,
    independent,
    languages,
    maps,
    name,
    population,
    region,
    subregion,
    timezones,
  } = props.data;

  // * Getting a native Name from name object
  const nativeName = name.nativeName;
  let officialName = [];
  for (let i in nativeName) {
    officialName.push(nativeName[i].official);
  }

  // * Sending data to parent component
  const sendData = (e) => {
    props.onClick(e.target.innerText);
  };

  const countryLanguages = () => {
    const newLanguages = [];
    for (let lang in languages) {
      newLanguages.push(languages[lang]);
    }
    return newLanguages.join(", ");
  };

  const countryCurrency = () => {
    const newCurrencies = [];
    for (let cur in currencies) {
      newCurrencies.push(currencies[cur]);
    }
    return newCurrencies[0].name;
  };

  const countryBorder = () => {
    const borderCont = borders
      ? borders.map((border, index) => (
          <a key={index} onClick={sendData} className="border-country">
            {border}
          </a>
        ))
      : "No border Countries";
    return borderCont;
  };

  return (
    <div className="right-side">
      <h1 className="country-name">{name.common}</h1>
      <div className="data-block">
        <div className="block-1">
          <h3>
            Native Name: <span>{officialName.join(", ")}</span>
          </h3>
          <h3>
            Capital: <span>{capital}</span>
          </h3>
          <h3>
            Region: <span>{region}</span>
          </h3>
          <h3>
            Sub region: <span>{subregion}</span>
          </h3>
          <h3>
            Population: <span>{population}</span>
          </h3>
          <h3>
            Continents: <span>{continents}</span>
          </h3>
        </div>
        <div className="block-2">
          <h3>
            Independent: <span>{independent ? "True" : "False"}</span>
          </h3>
          <h3>
            Currencies: <span>{countryCurrency()}</span>
          </h3>
          <h3>
            Languages: <span>{countryLanguages()}</span>
          </h3>
          <h3>
            Area: <span>{area}</span>
          </h3>
          <h3>
            Car side: <span>{car.side}</span>
          </h3>
          <h3 className="timezones">
            Timezones: <span>{timezones.join(", ")}</span>
          </h3>
        </div>
      </div>
      <div className="maps">
        Maps:
        <a href={maps.googleMaps} target="_blank" rel="noreferrer">
          Google map
        </a>
        <a href={maps.openStreetMaps} target="_blank" rel="noreferrer">
          OpenStreet map
        </a>
      </div>
      <div className="borders">Border Countries: {countryBorder()}</div>
    </div>
  );
};

//

export default RightSide;
