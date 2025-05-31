import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import RootLayout from "./Components/RootLayout/RootLayout";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
  const token = localStorage.getItem('email')
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/home", element: token ? <Home /> : <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
