import React from "react";

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter((person) => {
          if (props.searchText === "") {
            return person;
          } else if (
            person.name
              .toLocaleLowerCase()
              .includes(props.searchText.toLocaleLowerCase())
          ) {
            return person;
          }
          return null;
        })
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Persons;
