import "./Notification.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
