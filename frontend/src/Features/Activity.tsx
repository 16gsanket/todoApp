import {
  Box,
  Button,
  Dialog,
  Grid2,
  Slide,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import Container from "@mui/material/Container";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import { Checkbox } from "@mui/material";
import currentDate from "../helper/currentDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskCard from "../Components/TaskCard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface fromData {
  name: String;
  decription: String;
  completed: Boolean;
  priority: String;
}

function Activity(): JSX.Element {
  const [open, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const today = new Date();
  const day: any = today.getDate();
  const month: any = today.getMonth() + 1;
  const year: any = today.getFullYear();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setIsOpen(false);
  };

  const getTasksList = async () => {
    const todayDate: any = currentDate();

    const response = await fetch(
      `http://localhost:8000/api/v1/task/find-tasks-by-date/${todayDate}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const responseData = await response.json();

    console.log(responseData);

    return responseData.data.tasks.reverse();
  };

  const { isLoading, data: tasksList } = useQuery({
    queryKey: ["tasklist"],
    queryFn: getTasksList,
  });

 

  const addTask = async (data: any) => {
    let response = await fetch(
      "http://localhost:8000/api/v1/task/create-task",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.success) {
      alert(responseData.message);
      setIsOpen(false);
      reset();
    } else {
      console.log("error");
    }
  };

  const { mutate } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasklist"] }); // Clears cache and refetches tasks
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Grid2
      container
      sx={{
        bgcolor: "paper",
        height: "90dvh",
        width: {
          xs: "90dvw",
          sm: "90dvw",
          md: "60dvw",
          lg: "50dvh",
          xl: "50dvh",
        },
      }}
    >
      <Container
        sx={{
          height: "10%",
          width: "90%",
          bgcolor: "background.lavender",
          borderRadius: "25px",
          marginTop: "3%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          color="initial"
          sx={{ width: "fit", textAlign: "center" }}
        >
          {day}-{month}-{year}
        </Typography>
      </Container>
      <Container
        disableGutters
        sx={{
          height: "80%",
          width: "90%",
          bgcolor: "background.lavender",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "15%",
            width: "100%",
            bgcolor: "background.darklavender",
            padding: "10px 10px",
            position: "relative",
          }}
        >
          <AddCircleOutlineIcon
            onClick={() => setIsOpen(!open)}
            sx={{
              color: "white",
              scale: "2",
              position: "absolute",
              right: "10%",
              top: "50%",
              transform: "translateY(-25%)",
              ":hover": {
                color: "lightgray",
                scale: "1.5",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                transform: "translateY(-35%)",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            height: "85%",
            width: "100%",
            bgcolor: "background.lightblue",
            padding: "10px 10px",
            position: "relative",
            overflowY: "scroll",
          }}
        >
          {/* {!isLoading && tasksList.map((items: any) => {
            return (
              <Typography variant="h5" color="initial">
               { items.name}
              </Typography>
            );
          })} */}
          {!isLoading &&
            tasksList?.map((items: any) => {
              return <TaskCard items={items} key={items._id}/>
            })}
        </Box>
      </Container>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            height: "80vh", // Adjust height (e.g., 80% of viewport height)
            width: "60vw", // Optional: Adjust width
            maxHeight: "none", // Remove default max-height restriction
          },
        }}
      >
        <DialogTitle>
          {"Whats On Your Mind Today? Lets Jot It Down !"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              id="name"
              label="Title"
              variant="outlined"
              type="text"
              sx={{ marginTop: "10px", width: "100%" }}
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && "Title is required"}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              {...register("description", {
                required: true,
              })}
              error={!!errors.description}
              helperText={errors.description && "Description is required"}
              sx={{ marginTop: "10px", width: "100%" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="priority"
                label="Priority"
                select
                variant="outlined"
                defaultValue={"low"}
                {...register("priority", { required: true })}
                error={!!errors.priority}
                helperText={errors.priority && "Priority is required"}
                sx={{ marginTop: "10px", width: "45%" }}
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </TextField>

              <FormControlLabel
                control={<Checkbox {...register("completed")} />} // ✅ Correct spelling here
                label="Completed"
                sx={{ marginTop: "10px" }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid2>
  );
}

export default Activity;
