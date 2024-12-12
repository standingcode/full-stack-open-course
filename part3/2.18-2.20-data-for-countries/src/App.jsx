import { useState, useEffect } from "react";
import FilteredResults from "./components/FilteredResults";
import FilterSearchBox from "./components/FilterSearchBox";
import countriesService from "./services/Countries";
import Notification from "./components/Notifications";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [informationMessage, setinformationMessage] = useState(null);

  const filterFieldChanged = (event) => {
    setFilter(event.target.value);
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
      <Notification message={informationMessage} type="information" />
      <FilterSearchBox
        filter={filter}
        filterFieldChanged={filterFieldChanged}
      />
      <FilteredResults countries={allCountries} filter={filter} />
    </div>
  );
};

export default App;
