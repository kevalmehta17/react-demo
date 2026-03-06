import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";
import type { User } from "../../types/User.ts";

const UserTableList = () => {
  const { state } = useContext(UserContext);
  console.log("table is", state.users);

  const fieldValue = state.appliedFilter.field;
  const uniqueValue = state.appliedFilter.uniqueVal;

  const displayUsers = ():User[] => {
    return fieldValue && uniqueValue ? state.users.filter((user : User)=>{
      if(fieldValue === "age"){
        return user.age === Number(uniqueValue);
      }else{
        return user[fieldValue as keyof User].toString().toLowerCase() === uniqueValue
      }
    }) : state.users
  }
  
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
          {state.users && displayUsers().map((user)=> (
            <tr>
              <td>{user.userName}</td>
              <td>{user.city}</td>
              <td>{user.age}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};

export default UserTableList;
