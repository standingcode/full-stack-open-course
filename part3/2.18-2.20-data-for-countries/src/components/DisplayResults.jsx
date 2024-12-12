const DisplayResults = ({ results, displayCountryButtonCallback }) => {
  return (
    <table key="thingy">
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
