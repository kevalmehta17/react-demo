import UserProvider from "../../contextStore/UserProvider";
import ContextPageContent from "./ContextPageContent";

const ContextPage = () => {
  return (
    <UserProvider>
      <ContextPageContent />
    </UserProvider>
  );
};

export default ContextPage;