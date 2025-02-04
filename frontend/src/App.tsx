import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import ErroPage from "./Pages/ErroPage";
import HomePage from "./Pages/HomePage";
import Login from "./Features/Login";
import SingIn from "./Features/SingIn";
import Activity from "./Features/Activity";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { Provider } from "react-redux";
import store from "./Features/app/store";

interface AppProps {}

function App(props: AppProps): JSX.Element {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErroPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <SingIn />,
        },
        {
          path: "/Activity",
          element: <Activity />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
