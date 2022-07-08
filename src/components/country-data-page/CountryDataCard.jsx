import React, { useState, useEffect } from "react";
import "./CountryDataCard.css";
import { useLocation, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import { COUNTRIES_ACTION } from "../action-keys/Actions";
// import { useSelector, useDispatch } from "react-redux";
// import { getCountry } from "../../redux/country/countrySlice";

const Users = () => {
  // const countries = useSelector((state) => state.country.countries);
  // const dispatch = useDispatch();
  const data = useLocation().state;
  const [newData, setNewData] = useState("");
  // useEffect(() => {
  //   dispatch(getCountry());
  // }, [dispatch]);
  const getCountries = (key) => {
    const countries = sessionStorage.getItem(key);
    return JSON.parse(countries);
  };
  const countriesData = getCountries(COUNTRIES_ACTION);

  // * Getting data from child component
  const getData = (text) => {
    countriesData.forEach((country) => {
      if (country.cca3 === text) {
        setNewData(country);
      }
    });
  };

  return (
    <div className="main-card-cont">
      <div className="card-data">
        <Link className="back-btn" to="/">
          <IoMdArrowRoundBack /> Back
        </Link>
        <div className="components">
          <LeftSide flag={newData ? newData.flags.svg : data.flags.svg} />
          <RightSide onClick={getData} data={newData ? newData : data} />
        </div>
      </div>
    </div>
  );
};

export default Users;
