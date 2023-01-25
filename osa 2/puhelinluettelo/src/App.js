import { useState } from "react";
import { data } from "./data/data";
import Filter from "./components/filter/Filter";
import PersonForm from "./components/personform/PersonForm";
import Persons from "./components/persons/Persons";

const App = () => {
  const phoneBookData = data;

  const [persons, setPersons] = useState(phoneBookData);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameForSearch, setNameForSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find(({ name }) => name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameForSearch={nameForSearch}
        setNameForSearch={setNameForSearch}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} nameForSearch={nameForSearch} />
    </div>
  );
};

export default App;
