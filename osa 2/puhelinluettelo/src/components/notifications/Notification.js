import "./Notification.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const messageSplit = message.split(" ");
  let type = messageSplit[0];

  if (type === "Added" || type === "Updated" || type === "Deleted")
    return <div className="success">{message}</div>;

  if (type === "Error!") return <div className="error">{message}</div>;
};

export default Notification;
