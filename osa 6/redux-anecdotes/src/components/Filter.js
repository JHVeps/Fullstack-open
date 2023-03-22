import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";
const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const text = event.target.value;
    dispatch(filterChange(text));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
