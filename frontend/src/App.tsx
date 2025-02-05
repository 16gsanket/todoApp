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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface AppProps {}

function App(props: AppProps): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: true
      },
    },
  });
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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
