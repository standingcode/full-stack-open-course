import { useState, useEffect } from "react";
import FilteredResults from "./components/FilteredResults";
import AddUserForm from "./components/AddUserForm";
import FilterSearchBox from "./components/FilterSearchBox";
import noteService from "./services/Persons";
import Notification from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  const addNameInputFieldChanged = (event) => {
    setNewName(event.target.value);
  };

  const addNumberInputFieldChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const addNameInputFieldSubmitted = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, would you like to update the number?`
        )
      ) {
        console.log("Update the number");

        const updatePersonObject = { ...existingPerson, number: newNumber };

        noteService
          .update(existingPerson.id, updatePersonObject)
          .then((responseDataObject) => {
            setPersons(
              persons
                .filter((person) => person.id !== existingPerson.id)
                .concat(responseDataObject)
            );
          })
          .catch((error) => {
            alert(`Something went wrong with the update: ${error}`);
          });

        return;
      } else {
        return;
      }
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

  const deleteContactButtonPressed = (id) => {
    // console.log(`Delete contact id: ${id}`);

    if (
      window.confirm(
        `Are you sure you want to delete ${
          persons.find((person) => person.id === id).name
        }`
      )
    ) {
      noteService
        .remove(id)
        .then((deletedPersonObject) => {
          setPersons(
            persons.filter((person) => person.id !== deletedPersonObject.id)
          );
        })
        .catch((error) => {
          alert(`Something went wrong with the deletion: ${error}`);
        });
    }
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
      <FilteredResults
        persons={persons}
        filter={filter}
        deleteCallback={deleteContactButtonPressed}
      />
    </div>
  );
};

export default App;
