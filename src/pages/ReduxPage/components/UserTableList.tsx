import { useSelector } from "react-redux";
import type { User } from "../../types/User";

const UserTableList = () => {
  const userList = useSelector((state) => state.user.users);
  const appliedFilterField = useSelector(
    (state) => state.filter.appliedFilter.field,
  );
  const appliedFilterValue = useSelector(
    (state) => state.filter.appliedFilter.uniqueVal,
  );
  console.log("we got both values", appliedFilterField, appliedFilterValue);

  const displayUser = (): User[] => {
    return appliedFilterField && appliedFilterValue
      ? userList.filter((user: User) => {
          if (appliedFilterField === "age") {
            return user[appliedFilterField] === Number(appliedFilterValue);
          } else {
            return (
              user[appliedFilterField as keyof User]
                .toString()
                .toLowerCase() === appliedFilterValue
            );
          }
        })
      : userList;
  };

  console.log("dis", displayUser);
  return (
    <div>
      <h2>Table</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            displayUser().map((user) => (
              <tr>
                <td>{user.userName}</td>
                <td>{user.city}</td>
                <td>{user.age}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableList;
