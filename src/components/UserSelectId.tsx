import type { User } from "../types/User";
import SelectDropdown from "./SelectDropdown";

interface UserSelectIdProps {
  users: User[];
  selectedId: number | null;
  onChangeId: (id: number | null) => void;
}

const UserSelectId = ({
  users,
  selectedId,
  onChangeId,
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
          onChangeId(val ? Number(val) : null);
        }}
        options={options}
        defaultOption="Select ID"
      />
    </div>
  );
};

export default UserSelectId;