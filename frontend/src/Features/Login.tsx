import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "./auth/authSlice";
import { useDispatch } from "react-redux";

function Login(): JSX.Element {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log(data);

    const formData = new FormData();
    // File input
    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await fetch(
      "http://localhost:8000/api/v1/user/login-user",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email:data.email,
          password:data.password
        }),
       credentials:"include" 
      }
    );

    const dataFromResponse = await response.json();
    console.log(dataFromResponse);

    if (dataFromResponse.success) {
      dispatch(setUser({email:dataFromResponse.data.email}))
      navigate("/Activity");
    }else{
      alert(dataFromResponse.message)
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "500px",
        height: "fit",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        bgcolor: "background.paper",
        borderRadius: "20px",
        paddingY: "50px",
      }}
    >
      <Typography variant="h6" align="center">
        Login
      </Typography>

      {/* Name Field */}

      {/* Email Field */}
      <TextField
        sx={{ width: "300px" }}
        label="Email"
        variant="outlined"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {/* Password Field */}
      <TextField
        sx={{ width: "300px" }}
        label="Password"
        variant="outlined"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Sign In <ArrowForwardIcon />
      </Button>
    </Box>
  );
}

export default Login;
