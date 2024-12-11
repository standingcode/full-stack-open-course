import { useState, useEffect } from "react";
import FilteredResults from "./components/FilteredResults";
import AddUserForm from "./components/AddUserForm";
import FilterSearchBox from "./components/FilterSearchBox";
import noteService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

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
    };

    noteService
      .create(newNameObject)
      .then((newContactFromServer) => {
        setPersons(persons.concat(newContactFromServer));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert(`Contact could not be added: ${error}`);
      });
  };

  const filterFieldChanged = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    noteService
      .getAll()
      .then((initialData) => {
        setPersons(initialData);
      })
      .catch((error) => {
        alert(`List of contacts could not be loaded: ${error}`);
      });
  }, []);

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
