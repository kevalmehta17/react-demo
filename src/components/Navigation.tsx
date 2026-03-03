import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div style={{display: "flex", gap:"20px"}}>
      <Link to="/"><h2>State</h2></Link>
      <Link to="/context"><h2>Context</h2></Link>
      <Link to="/redux"><h2>Redux</h2></Link>
    </div>
  );
};

export default Navigation;

