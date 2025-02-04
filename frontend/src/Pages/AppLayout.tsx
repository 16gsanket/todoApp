import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../Features/auth/authSlice";

function AppLayout(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userData: any = useSelector((state): any => state.auth.user);

  const handleLogout = async () => {
    const response: any = await fetch(
      "http://localhost:8000/api/v1/user/logout-user",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
      }
    );

    const dataResponse: any = await response.json();

    if (dataResponse.success) {
      dispatch(removeUser());
    }

    console.log(dataResponse);

    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", height: "100dvh", flexDirection: "column" }}>
      <AppBar position="fixed" sx={{ height: "60px" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
             <MenuIcon /> 
             </IconButton> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{ textDecoration: "none" , color:"white"}}>Task Manager</NavLink>
          </Typography>
          {!userData && (
            <NavLink to="/login">
              {location.pathname !== "/login" && (
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Login
                </Button>
              )}
            </NavLink>
          )}
          {userData && (
            <Button color="inherit" onClick={handleLogout}>
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "60px",
          overflow: "auto",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
