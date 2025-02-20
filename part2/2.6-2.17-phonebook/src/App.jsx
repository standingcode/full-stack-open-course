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
  const [errorMessage, setErrorMessage] = useState(null);
  const [informationMessage, setinformationMessage] = useState(null);

  const addNameInputFieldChanged = (event) => {
    setNewName(event.target.value);
  };

  const addNumberInputFieldChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const addNameInputFieldSubmitted = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${newName.toLowerCase()} is already added to phonebook, would you like to update the number?`
        )
      ) {
        const updatePersonObject = { ...existingPerson, number: newNumber };

        noteService
          .update(existingPerson.id, updatePersonObject)
          .then((responseDataObject) => {
            setPersons(
              persons
                .filter((person) => person.id !== existingPerson.id)
                .concat(responseDataObject)
            );

            setinformationMessage(
              `'${newName}' was updated with the number ${newNumber}`
            );
            setTimeout(() => {
              setinformationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            if (error.status === 404) {
              setErrorMessage(
                `'${newName}' has already been removed from the server`
              );
              setPersons(
                persons.filter((person) => person.id !== existingPerson.id)
              );
            } else {
              setErrorMessage(
                `Something went wrong with the update for '${newName}': ${error}`
              );
            }

            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });

        setNewName("");
        setNewNumber("");

        return;
      } else {
        setNewName("");
        setNewNumber("");
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

        setinformationMessage(
          `'${newName}' was added with the number ${newNumber}`
        );
        setTimeout(() => {
          setinformationMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(
          `The contact '${newName}' could not be added: ${error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const deleteContactButtonPressed = (id) => {
    const nameOfPersonToBeDeleted = persons.find(
      (person) => person.id === id
    ).name;

    if (
      window.confirm(
        `Are you sure you want to delete ${nameOfPersonToBeDeleted}`
      )
    ) {
      noteService
        .remove(id)
        .then((deletedPersonObject) => {
          setPersons(
            persons.filter((person) => person.id !== deletedPersonObject.id)
          );

          setinformationMessage(
            `'${deletedPersonObject.name}' was deleted from the phonebook`
          );
          setTimeout(() => {
            setinformationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `The contact '${nameOfPersonToBeDeleted}' could not be deleted: ${error}`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
        setErrorMessage(`The list of contacts could not be loaded: ${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={informationMessage} type="information" />
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
