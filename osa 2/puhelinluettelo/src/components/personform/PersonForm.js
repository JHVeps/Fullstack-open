import React from "react";
import personsServices from "../../services/persons.services";

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: props.newName,
      number: props.newNumber,
    };

    if (props.persons.find(({ name }) => name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`);
      return;
    }

    personsServices.create(personObject).then((response) => {
      props.setPersons(props.persons.concat(response));
    });
    props.setNewName("");
    props.setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={props.newName}
          onChange={(e) => props.setNewName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={(e) => props.setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

export default PersonForm;
