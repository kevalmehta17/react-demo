import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import UserTable from "../../../components/UserTable";
import { getFilteredUsers } from "../../../utils/getFilterUnique";

const UserTableList = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state } = context;
  const { users, appliedFilter } = state;

  return (
    <div>
      <UserTable users={getFilteredUsers(users, appliedFilter)} />

    </div>
  );
};

export default UserTableList;