import { Container, Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerticalBoxImage from "../Components/VerticalBoxImage";
import HorizontalImage from "../Components/HorizontalImage";
import { NavLink } from "react-router-dom";

function HomePage(): JSX.Element {
  const boxCss = {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translateY(-50%)",
  };
  const boxHorCss = {
    position: "absolute",
    top: "50%",
    right: "10%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        margin: "0px",
        padding: "0px",
      }}
    >
      <Box
        sx={{
          width: "45%",
          // bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          items: "center",
          gap: "5px",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ textAlign: "start" }}>
            {" "}
            Hello <span style={{ color: "lightgray" }}>User</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              items: "center",
              gap: "5px",
            }}
          >
            <Typography variant="h2"> Manage your</Typography>
            <Typography variant="h2"> Daily Tasks.</Typography>
            <NavLink to="/signUp">
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: "15px", marginTop: "20px" }}
              >
                SignIn to Experince <ArrowForwardIcon />
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "45%",
          bgcolor: "background.paper",
          borderRadius: "100px",
          position: "relative",
        }}
      >
        <VerticalBoxImage
          sx={boxCss}
          image=""
          title="Mobile"
          subtitle="6 Tasks"
        />
        <Box sx={boxHorCss}>
          <HorizontalImage
            bg_color="background.lightBlue"
            image=""
            title="WireFrame"
            subtitle="12 Tasks"
          ></HorizontalImage>
          <HorizontalImage
            bg_color="background.lightYellow"
            image=""
            title="Website"
            subtitle="5 Tasks"
          ></HorizontalImage>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
