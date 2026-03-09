
import { createBrowserRouter } from "react-router-dom";
import RootLayout from  "../layout/RootLayout.tsx"
import StatePage from  "../pages/StatePage/StatePage.tsx"
import ErrorPage from "../pages/ErrorPage.tsx"
import ContextPage from "../pages/ContextPage/ContextPage.tsx";
import ReduxPage from "../pages/ReduxPage/ReduxPage.tsx";

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

export default router;
