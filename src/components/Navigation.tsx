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

