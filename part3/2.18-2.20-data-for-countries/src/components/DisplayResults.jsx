import DisplayFullCountryResult from "./DisplayFullCountryResult";

const DisplayResults = ({ filter, results, displayCountryButtonCallback }) => {
  // If countries is undefined or null, just return a blank element
  if (results === undefined || results === null || results.length === 0) {
    return [];
  }

  // If the filter is a blank string, request the user to enter a search
  if (filter === "") {
    return (
      <p>Enter a search into the &quot;Find countries&quot; filter box </p>
    );
  }

  if (results.length === 1) {
    return <DisplayFullCountryResult country={results[0]} />;
  } else {
    return (
      <table key="coutryResultsTable">
        <tbody>
          {results.map((country) => (
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
