import { useState, useEffect } from "react";
import FilteredResults from "./components/FilteredResults";
import FilterSearchBox from "./components/FilterSearchBox";
import countriesService from "./services/Countries";
import Notification from "./components/Notifications";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const filterFieldChanged = (event) => {
    setFilter(event.target.value);
  };

  const pressToShowCountryButtonPressed = (id) => {
    console.log(id);
    // setFilter();
  };

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialData) => {
        setAllCountries(initialData);
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
      <FilteredResults
        countries={allCountries}
        filter={filter}
        displayCountryButtonCallback={pressToShowCountryButtonPressed}
      />
    </div>
  );
};

export default App;
