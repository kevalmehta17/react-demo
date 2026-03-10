import UserProvider from "../../contextstore/UserProvider";
import ContextPageContent from "./ContextPageContent";

const ContextPage = () => {
  return (
    <UserProvider>
      <ContextPageContent />
    </UserProvider>
  );
};

export default ContextPage;