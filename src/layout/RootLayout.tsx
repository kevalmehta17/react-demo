import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const RootLayout = () => {
    return(
        <div>
            <Navigation />
            <Outlet />
        </div>
    )
}

export default RootLayout;


// Hint 2 — Derive the display list, don't store it
// Instead of a separate state for filtered results, create a plain variable (not state) called
//  displayUsers directly inside the component body. Write the logic: "if activeFilter has
//  both a field and a value, filter users by it —
//  otherwise use all of users." Use displayUsers in the table's .map() instead of users.