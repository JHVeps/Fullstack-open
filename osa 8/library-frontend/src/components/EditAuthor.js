import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const EditAuthor = () => {
  const [born, setBorn] = useState("");
  const [name, setName] = useState("");

  const [changeBYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const allAuthors = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (allAuthors.loading) {
      return;
    }

    if (allAuthors.error) {
      return;
    }

    const options = allAuthors.data.allAuthors.map((author) => ({
      value: author.name,
      label: author.name,
    }));

    // Update the selectedOption if the previously selected option is not available in the updated options
    if (
      name &&
      !options.find((option) => option.value === name.value) &&
      result.data &&
      result.data.editAuthor === null
    ) {
      setName(null);
    }
  }, [allAuthors.data, name, result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    changeBYear({ variables: { name: name.value, setBornTo: parseInt(born) } });

    setName("");
    setBorn("");
  };

  if (allAuthors.loading) {
    return <div>Loading...</div>; // Render a loading state if data is still loading
  }

  if (allAuthors.error) {
    return <div>Error loading authors</div>; // Render an error message if there is an error
  }

  const options = allAuthors.data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
