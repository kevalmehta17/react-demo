import type { User } from "../types/User";

interface Column<T> {
  label: string;
  key: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface UserTableProps {
  users: User[];
  columns: Column<User>[];
}

const UserTable = ({ users, columns }: UserTableProps) => {
  return (
    <div>
      <h2>Table</h2>
      <table border={1}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(user) : String(user[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;