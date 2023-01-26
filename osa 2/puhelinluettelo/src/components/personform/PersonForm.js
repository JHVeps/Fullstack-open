import React from "react";
import personsServices from "../../services/persons.services";

const PersonForm = (props) => {
  const {
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setNotificationMessage,
  } = props;
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find(({ name }) => name === personObject.name)) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = persons.find(
          (person) => person.name === personObject.name
        );
        personsServices
          .updatePerson(newPerson.id, personObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== newPerson.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`Updated ${personObject.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage(
              `Error! Person '${personObject.name}' was already removed from server`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== newPerson.id));
          });
      }
      return;
    }
    personsServices.create(personObject).then((response) => {
      setPersons(persons.concat(response));
    });
    setNewName("");
    setNewNumber("");
    setNotificationMessage(`Added ${personObject.name}`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

export default PersonForm;
