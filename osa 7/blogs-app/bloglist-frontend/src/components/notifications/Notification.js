import { useSelector } from "react-redux";
import { Alert, AlertTitle, Stack } from "@mui/material";

const Notification = (props) => {
  const message = useSelector((state) => state.notification.message);

  console.log("Notification: ", message);

  if (!message) {
    return null;
  }

  const messageSplit = message.split(" ");
  let type = messageSplit[0];

  if (
    type === "Added" ||
    type === "Deleted" ||
    type === "User" ||
    type === "Liked"
  ) {
    return (
      <Stack sx={{ width: "100%", borderRadius: 2 }} spacing={2}>
        <Alert variant="filled" severity="success">
          <AlertTitle>SUCCESS</AlertTitle>
          {message}
        </Alert>
      </Stack>
    );
  } else if (type === "Error:") {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity="error">
          <AlertTitle>ERROR</AlertTitle>
          {message}
        </Alert>
      </Stack>
    );
  }
};

Notification.displayName = "Notification";

export default Notification;
