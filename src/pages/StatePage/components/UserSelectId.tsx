import type { UserSelectIdProps } from "../../../types/User";
import SelectDropdown from "../../../components/SelectDropdown";

const UserSelectId = ({
  users,
  selectedId,
  setSelectedId,
  setMode,
  setFormData,
}: UserSelectIdProps) => {
  const options = users.map((user) => ({
    label: String(user.id),
    value: user.id,
  }));

  return (
    <div>
      <SelectDropdown
        label="Select ID:"
        value={selectedId ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) {
            setSelectedId(null);
            setMode("save");
            setFormData({ userName: "", city: "", age: 0 });
            return;
          }
          const id = Number(val);
          setSelectedId(id);
          setMode("update");
          const user = users.find((u) => u.id === id);
          if (user) {
            setFormData({ userName: user.userName, city: user.city, age: user.age });
          }
        }}
        options={options}
        defaultOption="Select ID"
      />
    </div>
  );
};

export default UserSelectId;