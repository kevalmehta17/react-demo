import type { User } from "../../types/User";

interface UserTableProps {
  displayUsers: () => User[];
}

const UserTable = ({ displayUsers }: UserTableProps) => {
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
            {displayUsers().map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>{user.city}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  )
}

export default UserTable
