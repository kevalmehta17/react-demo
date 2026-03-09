import type { User } from "../types/User";
import SelectDropdown from "./SelectDropdown";

interface UserSelectIdProps {
  users: User[];
  selectedId: number | null;
  onSelectId: (id: number) => void;
  onDeselectId: () => void;
  onClear: () => void;
}

const UserSelectId = ({
  users,
  selectedId,
  onSelectId,
  onDeselectId,
  onClear,
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
            onDeselectId();
            onClear();
            return;
          }
          onSelectId(Number(val));
        }}
        options={options}
        defaultOption="Select ID"
      />
    </div>
  );
};

export default UserSelectId;