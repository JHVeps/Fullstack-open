import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter/Filter";
import PersonForm from "./components/personform/PersonForm";
import Persons from "./components/persons/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameForSearch, setNameForSearch] = useState("");

  const baseUrl = "http://localhost:3001/persons";

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

    axios.post(baseUrl, personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get(baseUrl);
    promise.then(eventHandler);
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
