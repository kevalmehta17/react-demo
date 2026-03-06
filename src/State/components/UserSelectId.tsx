import type { User, FormData, UserSelectIdProps } from "../../types/User.ts";


const UserSelectId = ({
  users,
  selectedId,
  setSelectedId,
  setMode,
  setFormData,
}: UserSelectIdProps) => {
  
     // HANDLING THE SELECTED ID
  const handleSelectedId = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const id = Number(e.target.value);
    if (!id) {
      setSelectedId(null);
      setMode("save");
      setFormData({
        userName: "",
        city: "",
        age: 0,
      });
      return;
    }
    setSelectedId(id);
    console.log("selected id", id);
    // fill the input field by finding the id in the user array
    const user = users.find((user) => user.id === id);
    setFormData({
      userName: user?.userName ?? "",
      city: user?.city ?? "",
      age: user?.age ?? 0,
    });
    setMode("update");
    console.log("found user", user);
    console.log("users State", users);
  };

  return (
   <div>
        <label>Select based on ID: </label>
        <select onChange={handleSelectedId} value={selectedId ?? ""}>
          <option value="">Select Id</option>
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
        </select>
      </div>
  )
}

export default UserSelectId;
