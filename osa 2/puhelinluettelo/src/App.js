import { useState, useEffect } from "react";
import personsServices from "./services/persons.services";
import Filter from "./components/filter/Filter";
import PersonForm from "./components/personform/PersonForm";
import Persons from "./components/persons/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameForSearch, setNameForSearch] = useState("");

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameForSearch={nameForSearch}
        setNameForSearch={setNameForSearch}
      />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        nameForSearch={nameForSearch}
      />
    </div>
  );
};

export default App;
