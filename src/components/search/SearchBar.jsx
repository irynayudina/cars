import React, { useState, useEffect } from "react";
import './SearchBar.css'
import filterCars from "../../utils/filterCars";
import loadCars from "../../utils/loadCars";
import Input from "../inputs/Input";
import InputCheckbox from "../inputs/InputCheckbox";

const SearchBar = ({ setCars }) => {
  const [company, setCompany] = useState("")
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [color, setColor] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [fetchedStateFlag, setFetchedStateFlag] = useState(false)
    
  const filterAndDisplayCars = () => {
    console.log(isAvailable);
    loadCars().then((cars) => {
      const filteredCars = filterCars(
        cars,
        company,
        model,
        vin,
        color,
        yearFrom,
        yearTo,
        priceFrom,
        priceTo,
        isAvailable
      );
      setCars(filteredCars);
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    filterAndDisplayCars();
    sessionStorage.setItem("company", company);
    sessionStorage.setItem("model", model);
    sessionStorage.setItem("vin", vin);
    sessionStorage.setItem("color", color);
    sessionStorage.setItem("yearFrom", yearFrom);
    sessionStorage.setItem("yearTo", yearTo);
    sessionStorage.setItem("priceFrom", priceFrom);
    sessionStorage.setItem("priceTo", priceTo);
    sessionStorage.setItem("isAvailable", isAvailable);
  };

  const resetSearchBar = () => {
    setCompany("");
    setModel("");
    setVin("");
    setColor("");
    setYearFrom("");
    setYearTo("");
    setPriceFrom("");
    setPriceTo("");
    setIsAvailable(false);
    loadCars().then((cars) => {
      setCars(cars);
    });
    sessionStorage.removeItem("company");
    sessionStorage.removeItem("model", model);
    sessionStorage.removeItem("vin", vin);
    sessionStorage.removeItem("color", color);
    sessionStorage.removeItem("yearFrom", yearFrom);
    sessionStorage.removeItem("yearTo", yearTo);
    sessionStorage.removeItem("priceFrom", priceFrom);
    sessionStorage.removeItem("priceTo", priceTo);
    sessionStorage.removeItem("isAvailable", isAvailable);
  }

  useEffect(() => {
    setCompany(sessionStorage.getItem("company") || "");
    setModel(sessionStorage.getItem("model") || "");
    setVin(sessionStorage.getItem("vin") || "");
    setColor(sessionStorage.getItem("color") || "");
    setYearFrom(sessionStorage.getItem("yearFrom") || "");
    setYearTo(sessionStorage.getItem("yearTo") || "");
    setPriceFrom(sessionStorage.getItem("priceFrom") || "");
    setPriceTo(sessionStorage.getItem("priceTo") || "");
    setIsAvailable(sessionStorage.getItem("isAvailable") === 'true');
    setFetchedStateFlag(true);
  }, [])

  useEffect(() => {
    filterAndDisplayCars();
  }, [fetchedStateFlag]);

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit}>
        <Input
          idProp="company"
          placeholderProp="Company..."
          labelProp="Company..."
          valueInp={company}
          setValueInp={setCompany}
        />
        <Input
          idProp="model"
          placeholderProp="Model..."
          labelProp="Model..."
          valueInp={model}
          setValueInp={setModel}
        />
        <Input
          idProp="vin"
          placeholderProp="VIN..."
          labelProp="VIN..."
          valueInp={vin}
          setValueInp={setVin}
        />
        <Input
          idProp="color"
          placeholderProp="Color..."
          labelProp="Color..."
          valueInp={color}
          setValueInp={setColor}
        />
        <Input
          typeProp="number"
          idProp="yearFrom"
          placeholderProp="Year from..."
          labelProp="Year from..."
          valueInp={yearFrom}
          setValueInp={setYearFrom}
        />
        <Input
          typeProp="number"
          idProp="yearTo"
          placeholderProp="Year to..."
          labelProp="Year to..."
          valueInp={yearTo}
          setValueInp={setYearTo}
        />
        <Input
          typeProp="number"
          idProp="priceFrom"
          placeholderProp="Price from..."
          labelProp="Price from..."
          valueInp={priceFrom}
          setValueInp={setPriceFrom}
        />
        <Input
          typeProp="number"
          idProp="priceTo"
          placeholderProp="Price to..."
          labelProp="Price to..."
          valueInp={priceTo}
          setValueInp={setPriceTo}
        />
        <InputCheckbox
          idProp="availability"
          labelProp="Availability..."
          isChecked={isAvailable}
          setIsChecked={setIsAvailable}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={resetSearchBar}>Reset</button>
      </form>
    </div>
  );
}

export default SearchBar
