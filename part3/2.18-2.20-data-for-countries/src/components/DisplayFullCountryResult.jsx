const DisplayFullCountryResult = ({ country }) => {
  return (
    <div>
      <h2>
        {country.name.common} ({country.name.official})
      </h2>

      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>

      <h2>languages:</h2>
      <p>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </p>
      <img src={country.flags.svg} width="200" />
    </div>
  );
};

export default DisplayFullCountryResult;
