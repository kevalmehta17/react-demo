import { useContext } from "react";
import { UserContext } from "../../src/contextStore/UserContext";
import UserTable from "../../src/components/UserTable";
import { getFilteredUsers } from "../../src/utils/userFormHandlers";
import { userColumns } from "../../src/constants/userColumns";

const UserTableList = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state } = context;
  const { users, appliedFilter } = state;

  return (
    <div>
      <UserTable users={getFilteredUsers(users, appliedFilter)} columns={userColumns} />
    </div>
  );
};

export default UserTableList;

