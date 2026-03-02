import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import StatePage from "./pages/StatePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ContextPage from "./pages/ContextPage.tsx";
import ReduxPage from "./pages/ReduxPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <StatePage /> },
      { path: "/context", element: <ContextPage /> },
      { path: "/redux", element: <ReduxPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
