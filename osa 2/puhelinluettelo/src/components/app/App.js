import { useState, useEffect } from "react";
import personsServices from "../../services/persons.services";
import Notification from "../notifications/Notification";
import Filter from "../filter/Filter";
import PersonForm from "../personform/PersonForm";
import Persons from "../persons/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameForSearch, setNameForSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
        setNotificationMessage={setNotificationMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        nameForSearch={nameForSearch}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default App;
