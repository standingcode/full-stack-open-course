import DisplayFullCountryResult from "./DisplayFullCountryResult";
import DisplayResults from "./DisplayResults";

const FilteredResults = ({
  countries,
  filter,
  displayCountryButtonCallback,
}) => {
  // If countries is undefined or null, just return a blank element
  if (countries === undefined || countries === null) {
    return <></>;
  }

  // If the filter is a blank string, request the user to enter a search
  if (filter === "") {
    return (
      <p>Enter a search into the &quot;Find countries&quot; filter box </p>
    );
  }

  // Apply the filter
  const filteredCountries = countries.filter(
    (country) =>
      country.name.official.toLowerCase().includes(filter.toLowerCase()) ||
      country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  // Different outcomes based on the length of the filteredCountries array
  const filteredCountriesLength = filteredCountries.length;

  // Returning the full country information when we have just one country
  if (filteredCountriesLength === 1) {
    return (
      <>
        <DisplayFullCountryResult country={filteredCountries[0]} />
      </>
    );
  }

  // Tell user to refine search if we have over 10 results
  if (filteredCountriesLength > 10) {
    return <p>Too many matches, try a longer filter </p>;
  }

  // Return the filtered results
  return (
    <>
      <DisplayResults
        results={filteredCountries}
        displayCountryButtonCallback={displayCountryButtonCallback}
      />
    </>
  );
};

export default FilteredResults;
