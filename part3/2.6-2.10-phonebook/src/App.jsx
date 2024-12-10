import { useState } from "react";
import FilteredResults from "./components/FilteredResults";
import AddUserForm from "./components/AddUserForm";
import FilterSearchBox from "./components/FilterSearchBox.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNameInputFieldChanged = (event) => {
    setNewName(event.target.value);
  };

  const addNumberInputFieldChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const addNameInputFieldSubmitted = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newNameObject));
    setNewName("");
    setNewNumber("");
  };

  const filterFieldChanged = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSearchBox
        filter={filter}
        filterFieldChanged={filterFieldChanged}
      />
      <h2>Add new</h2>
      <AddUserForm
        newName={newName}
        addNameInputFieldChanged={addNameInputFieldChanged}
        newNumber={newNumber}
        addNumberInputFieldChanged={addNumberInputFieldChanged}
        addNameInputFieldSubmitted={addNameInputFieldSubmitted}
      />
      <h2>Numbers</h2>
      <FilteredResults persons={persons} filter={filter} />
    </div>
  );
};

export default App;
