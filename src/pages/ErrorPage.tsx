import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ color: "red" }}>404- Page Not Found</h1>
      <hr />
      <div>
        <strong> Sorry! You are looking For the Page that not Exist</strong>
        <div style={{ display: "flex", padding: "10px" }}>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
