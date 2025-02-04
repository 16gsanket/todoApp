import { createTheme, TypeBackground, ThemeOptions } from "@mui/material";

interface CustomBackground extends TypeBackground{
  testColor:string,
  lavender:string
}



const theme = createTheme({
    palette: {
        primary: {
          main: "#1976d2", // Blue
        },
        secondary: {
          main: "#ff9800", // Orange
        },
        background: {
          default: "#f5f5f5", // Light gray
          paper: "#ffffff",
          testColor:"lightpink",
          lavender:"#DBD4FD",
          lightBlue:"#DEFFF9",
          lightYellow:"#E6F19E" // White for cards
        } as CustomBackground,
        text: {
          primary: "#333333", // Dark gray text
          secondary: "#757575", // Light gray text
        },
        
      },
     
})

export default theme;