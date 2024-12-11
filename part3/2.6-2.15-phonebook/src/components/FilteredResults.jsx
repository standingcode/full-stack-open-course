import DisplayResults from "./DisplayResults.jsx";

const FilteredResults = ({ persons, filter }) => {
  if (filter === undefined) {
    filter = "";
  }

  if (persons === undefined) {
    persons = [];
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return <DisplayResults key={"persons"} persons={filteredPersons} />;
};

export default FilteredResults;
