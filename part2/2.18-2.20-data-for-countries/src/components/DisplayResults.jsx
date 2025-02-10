import DisplayFullCountryResult from "./DisplayFullCountryResult";

const DisplayResults = ({
  filter,
  filteredCountries,
  allCountries,
  displayCountryButtonCallback,
}) => {
  // If countries is undefined or null, just return a blank element
  if (allCountries === null) {
    return <p>Data loading...</p>;
  }

  // If the filter is a blank string, request the user to enter a search
  if (filter === "") {
    return (
      <p>Start typing into the &quot;Search&quot; box to search and filter </p>
    );
  }

  if (filteredCountries.length === 0) {
    return <p>No countries matched the search</p>;
  } else if (filteredCountries.length === 1) {
    return <DisplayFullCountryResult country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 10) {
    return <p>Over 10 matches, keep typing to narrow the results...</p>;
  } else {
    return (
      <table key="coutryfilteredCountriesTable">
        <tbody>
          {filteredCountries.map((country) => (
            <DisplaySingleResult
              key={country.cca2 + country.ccn3}
              id={country.cca2 + country.ccn3}
              countryName={country.name}
              displayCountryButtonCallback={displayCountryButtonCallback}
            />
          ))}
        </tbody>
      </table>
    );
  }
};

const DisplaySingleResult = ({
  countryName,
  id,
  displayCountryButtonCallback,
}) => {
  return (
    <>
      <tr>
        <td>
          {countryName.common} ({countryName.official})
        </td>
        <td>
          <button onClick={() => displayCountryButtonCallback(id)}>
            Show country
          </button>
        </td>
      </tr>
    </>
  );
};

export default DisplayResults;
