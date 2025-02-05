import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function TaskCard({ items = "" }: any): JSX.Element {
  const [taskcompleted, setTaskCompleted] = useState(items.completed);
  const queryClient = useQueryClient();

  const deleteTask = async (taskid: any) => {
    console.log("deletetask", taskid);

    const response = await fetch(
      `http://localhost:8000/api/v1/task/delete-task/${taskid}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const responseData = await response.json();
    console.log(responseData);
  };

  const { mutate: deleteThisTask, isLoading } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasklist"] });
    },
  });

  const handleDelete = (itemId: any) => {
    console.log(itemId);
    console.log("handle Delete function ", itemId);

    deleteThisTask(itemId);
  };

  async function editThisTaskFunction(itemid: string) {
    const response = await fetch(
      `http://localhost:8000/api/v1/task/update-task/${itemid}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: items.name,
          description: items.description,
          completed: true,
          priority: items.priority,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    // setTaskCompleted(responseData.data.tasks.completed)
    return responseData;
  }

  const { mutate: editThisTask } = useMutation({
    mutationFn: editThisTaskFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasklist"] });
    },
  });
  function handleTaskClick(itemid: string) {
    console.log("taskId", itemid);

    // setTaskCompleted((prev: boolean) => !prev);
    console.log("task completed", taskcompleted);

    editThisTask(itemid);
  }

  return (
    <Card
      sx={{
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          {items.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "5px" }}
        >
          {items.description}
        </Typography>

        {/* Status and Priority */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          {/* Status: Completed */}
          <FormGroup>
            <FormControlLabel
              sx={{
                fontWeight: "bold",
                color: items.completed ? "green" : "red",
              }}
              control={<Checkbox checked={items.completed} />}
              label={items.completed ? "Completed" : "Not Completed"}
              onClick={() => {
                handleTaskClick(items._id);
              }}
            />
          </FormGroup>
          

          {/* Priority: Medium, Low, High */}
          <Chip label={items.priority} color={items.priority === "high" ? "error":"warning"} size="small" />
          <Box>
            <Button
              variant="outlined"
              sx={{ bgcolor: "background.default" }}
              color="inherit"
              onClick={() => handleDelete(items._id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
