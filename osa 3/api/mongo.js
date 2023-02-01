const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://JHVeps:${password}@cluster0.htxgz.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

if (name !== undefined && number !== undefined) {
  // eslint-disable-next-line no-unused-vars
  person.save().then((res) => {
    console.log("person saved!");
  });
}

Person.find({}).then((persons) => {
  console.log("Phonebook:");
  persons.forEach((person) => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});
