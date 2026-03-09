import type { User, AppliedFilter } from "../../../types/User";
import UserTable from "../../../components/UserTable";
import { getFilteredUsers } from "../../../utils/getFilterUnique";

interface UserTableListProps {
  users: User[];
  appliedFilter: AppliedFilter;
}

const UserTableList = ({ users, appliedFilter }: UserTableListProps) => {
  const filteredUsers = getFilteredUsers(users, {
    field: appliedFilter.field,
    uniqueVal: appliedFilter.uniqueVal,
  });

  return (
    <div>
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default UserTableList;
