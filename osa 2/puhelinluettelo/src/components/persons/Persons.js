import React from "react";
import personsServices from "../../services/persons.services";

const Persons = (props) => {
  const removePerson = (_id) => {
    const person = props.persons.find((p) => p.id === _id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personsServices.deletePerson(_id);
      props.setPersons(props.persons.filter((p) => p.id !== _id));
    }
    return;
  };

  return (
    <div>
      {props.persons
        .filter((person) => {
          if (props.nameForSearch === "") {
            return person;
          } else if (
            person.name
              .toLocaleLowerCase()
              .includes(props.nameForSearch.toLocaleLowerCase())
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
