
import type { User, AppliedFilter } from "../../../src/types/User";
import UserTable from "../../../src/components/UserTable";
import { getFilteredUsers } from "../../../src/utils/userFormHandlers";
import { userColumns } from "../../../src/constants/userColumns";

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
      <UserTable users={filteredUsers} columns={userColumns} />
    </div>
  );
};

export default UserTableList;


