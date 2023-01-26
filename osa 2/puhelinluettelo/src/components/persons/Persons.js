import React from "react";
import personsServices from "../../services/persons.services";

const Persons = (props) => {
  const { persons, setPersons, setNotificationMessage, nameForSearch } = props;
  const removePerson = (_id) => {
    const person = props.persons.find((p) => p.id === _id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personsServices.deletePerson(_id);
      setPersons(persons.filter((p) => p.id !== _id));
      setNotificationMessage(`Deleted ${person.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    return;
  };

  return (
    <div>
      {persons
        .filter((person) => {
          if (nameForSearch === "") {
            return person;
          } else if (
            person.name
              .toLocaleLowerCase()
              .includes(nameForSearch.toLocaleLowerCase())
          ) {
            return person;
          }
          return null;
        })
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>DELETE</button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
