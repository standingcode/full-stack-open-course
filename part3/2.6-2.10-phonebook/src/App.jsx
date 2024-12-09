import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNameInputFieldChanged = (event) => {
    setNewName(event.target.value);
  };

  const addNameInputFieldSubmitted = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert("${newName} is already added to phonebook");
      return;
    }

    const newNameObject = {
      name: newName,
    };

    setPersons(persons.concat(newNameObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameInputFieldSubmitted}>
        <div>
          name: <input value={newName} onChange={addNameInputFieldChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
