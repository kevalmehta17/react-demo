import { useSelector } from "react-redux";
import type { RootState } from "../store/UserStore";
import UserTable from "../../../components/UserTable";
import { getFilteredUsers } from "../../../utils/getFilterUnique";

const UserTableList = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const appliedFilter = useSelector((state: RootState) => state.filter.appliedFilter);

  return (
    <div>
      <UserTable users={getFilteredUsers(users, appliedFilter)} />
    </div>
  );
};

export default UserTableList;