import PropTypes from "prop-types";
import { forwardRef } from "react";

import "./Notification.css";

const Notification = forwardRef((props, ref) => {
  const { message } = props;
  if (message === null) {
    return null;
  }
  const messageSplit = message.split(" ");
  let type = messageSplit[0];

  if (
    type === "Added" ||
    type === "Deleted" ||
    type === "User" ||
    type === "Liked"
  )
    return (
      <div className="success" ref={ref}>
        {message}
      </div>
    );
});

Notification.displayName = "Notification";

Notification.propTypes = {
  message: PropTypes.string || null.isRequired,
};

export default Notification;
