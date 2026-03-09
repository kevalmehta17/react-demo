
import type { UserFormProps } from "../../../src/types/User";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import { handleFormSubmit, handleFormChange, handleFormDelete } from "../../../src/utils/userFormHandlers";

const UserForm = ({

  setUsers,
  formData,
  setFormData,
  mode,
  setMode,
  selectedId,
  setSelectedId,
  setAppliedFilter,
  setSelectValue,
}: UserFormProps) => {

  return (
    <div>
      <div>
        <h1>State Route</h1>
      </div>
      <div>
        <form
          onSubmit={(e) =>
            handleFormSubmit({
              e,
              mode: mode as "save" | "update",
              selectedId,
              onAdd: (user) => setUsers((prev) => [...prev, user]),
              onUpdate: (id, updatedData) =>
                setUsers((prev) =>
                  prev.map((u) => (u.id === id ? { ...u, ...updatedData } : u))
                ),
              onClear: () => {
                setFormData({ userName: "", city: "", age: 0 });
                setMode("save");
              },
              onDeselectId: () => setSelectedId(null),
            })
          }
        >
          <Input
            label="Name:"
            type="text"
            name="userName"
            value={formData.userName ?? ""}
            onChange={(e) =>
              handleFormChange(e, (field, value) =>
                setFormData((prev) => ({ ...prev, [field]: value }))
              )
            }
          />
          <Input
            label="City:"
            type="text"
            name="city"
            value={formData.city ?? ""}
            onChange={(e) =>
              handleFormChange(e, (field, value) =>
                setFormData((prev) => ({ ...prev, [field]: value }))
              )
            }
          />
          <Input
            label="Age:"
            type="number"
            name="age"
            value={formData.age ?? 0}
            onChange={(e) =>
              handleFormChange(e, (field, value) =>
                setFormData((prev) => ({ ...prev, [field]: value }))
              )
            }
          />
          <br />
          {mode === "save" && <Button type="submit" label="Save" />}
          {mode === "update" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="submit" label="Update" />
              <Button
                type="button"
                label="Delete"
                onClick={() =>
                  handleFormDelete({
                    selectedId,
                    onDelete: (id) =>
                      setUsers((prev) => prev.filter((u) => u.id !== id)),
                    onClear: () => {
                      setFormData({ userName: "", city: "", age: 0 });
                      setMode("save");
                      setAppliedFilter({ field: null, uniqueVal: "" });
                      setSelectValue("");
                    },
                    onDeselectId: () => setSelectedId(null),
                  })
                }
              />
            </div>
          )}
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserForm;
