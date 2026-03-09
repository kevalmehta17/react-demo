import { useSelector } from "react-redux";
import type { RootState } from "../../../src/pages/ReduxPage/store/UserStore";
import UserTable from "../../../src/components/UserTable";
import { getFilteredUsers } from "../../../src/utils/userFormHandlers";
import { userColumns } from "../../../src/constants/userColumns";

const UserTableList = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const appliedFilter = useSelector((state: RootState) => state.filter.appliedFilter);

  return (
    <div>
      <UserTable users={getFilteredUsers(users, appliedFilter)} columns={userColumns} />
    </div>
  );
};

export default UserTableList;