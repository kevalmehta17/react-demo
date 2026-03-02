import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div style={{display: "flex", gap:"20px"}}>
      <Link to="/">State</Link>
      <Link to="/context">Context</Link>
      <Link to="/redux">Redux</Link>
    </div>
  );
};

export default Navigation;


// I have a users array in state
// I need to show Name, City, Age in a table
// I do NOT show the id column (requirement)
// I loop over users with .map()
