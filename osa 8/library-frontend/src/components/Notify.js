const Notify = ({ message }) => {
  if (!message) {
    return null;
  }

  const messageSplit = message.split(" ");
  let type = messageSplit[0];

  if (type === "added") {
    return <div style={{ color: "green" }}>{message}</div>;
  }
  return <div style={{ color: "red" }}>{message}</div>;
};

export default Notify;
