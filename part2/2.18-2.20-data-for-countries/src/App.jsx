import { useState, useEffect } from "react";
import DisplayResults from "./components/DisplayResults";
import FilterSearchBox from "./components/FilterSearchBox";
import countriesService from "./services/Countries";
import Notification from "./components/Notifications";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const filterFieldChanged = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);

    // Apply the filter
    setFilteredCountries(
      allCountries.filter(
        (country) =>
          country.name.official
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          country.name.common.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  };

  const pressToShowCountryButtonPressed = (id) => {
    console.log(id);
    setFilteredCountries(
      filteredCountries.filter((country) => country.cca2 + country.ccn3 === id)
    );
  };

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialData) => {
        setAllCountries(initialData);
        setFilteredCountries(initialData);
      })
      .catch((error) => {
        setErrorMessage(`The list of countries could not be loaded: ${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  return (
    <div>
      <h1>Amazing Country Information Page</h1>
      <Notification message={errorMessage} type="error" />
      <FilterSearchBox
        filter={filter}
        filterFieldChanged={filterFieldChanged}
      />
      <DisplayResults
        filter={filter}
        filteredCountries={filteredCountries}
        allCountries={allCountries}
        displayCountryButtonCallback={pressToShowCountryButtonPressed}
      />
    </div>
  );
};

export default App;
