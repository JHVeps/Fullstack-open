import "./Notification.css";

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const msg = JSON.stringify(message);

  return <div className="error">{msg}</div>;
};

export default ErrorNotification;
