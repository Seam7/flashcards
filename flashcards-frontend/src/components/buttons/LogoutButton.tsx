import { Button } from "@mui/material";

import { useLogout } from "../../hooks/useLogout";

export const LogoutButton = () => {
  const { mutate: logout } = useLogout();
  return (
    <Button variant="contained" color="primary" onClick={() => logout()}>
      Logout
    </Button>
  );
};
