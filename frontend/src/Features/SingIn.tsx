import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { setUser } from "./auth/authSlice";
import { useDispatch } from "react-redux";

function SingIn(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const onSubmit = async(data: any) => {
    console.log(data);
   
  const formData = new FormData();
  formData.append("image", data.image[0]); // File input
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("dob", data.dob);
  formData.append("password", data.password);

  const response = await fetch("http://localhost:8000/api/v1/user/register-user", {
    method: "POST",
    body: formData, // Send FormData instead of JSON
  });

  const dataFromResponse = await response.json();
  console.log(dataFromResponse);

  if(dataFromResponse.success){
    dispatch(setUser({email:dataFromResponse.data.email}))
    navigate('/login')
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
        Sign Up
      </Typography>

      {/* Name Field */}
      <TextField
        sx={{ width: "300px" }}
        label="Name"
        variant="outlined"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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
      <TextField
        sx={{ width: "300px" }}
        id="datedob"
        label="DOB"
        variant="standard"
        type="date"
        InputLabelProps={{
          shrink: true, // To ensure the label doesn't overlap with the input
        }}
        {
          ...register("dob", {
            required: false,
          })  
        }
        error={!!errors.dob} // Display error if field is invalid
        helperText={errors.dob ? errors.dob.message : ""} // Show error message
      />
      <TextField
        id="fileInput"
        label="Profile Pic"
        variant="filled"
        type="file"
        InputLabelProps={{
          shrink:true
        }}
        {
          ...register("image",{
            required:true
          })
        }
        
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Sign In <ArrowForwardIcon />
      </Button>
    </Box>
  );
}

export default SingIn;
