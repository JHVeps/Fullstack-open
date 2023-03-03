import PropTypes from "prop-types";
import { forwardRef } from "react";

import "./Notification.css";

const ErrorNotification = forwardRef((props, ref) => {
  const { message } = props;
  if (message === null) {
    return null;
  }

  return (
    <div className="error" ref={ref}>
      {message.error}
    </div>
  );
});

ErrorNotification.displayName = "ErrorNotification";

ErrorNotification.propTypes = {
  message: PropTypes.object || null.isRequired,
};

export default ErrorNotification;
