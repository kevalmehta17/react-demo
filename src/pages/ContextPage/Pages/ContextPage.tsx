import UserProvider from "../store/UserProvider";
import UserForm from "../components/UserForm";
import UserSelectId from "../components/UserSelectId";
import UserTableList from "../components/UserTableList";
import FilterPanel from "../components/FilterPanel";

const ContextPage = () => {
  return (
    <UserProvider>
      <UserForm />
      <UserSelectId />
      <FilterPanel />
      <UserTableList />
    </UserProvider>
  );
};

export default ContextPage;