import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent, FormEvent } from "react";
import type { FormData as UserFormData } from "../../../types/User";
import type { RootState } from "../store/UserStore";
import {
  addUser,
  changeFormValue,
  clearInputData,
  deleteUser,
  selectIdNull,
  updateUser,
} from "../store/UserSlice";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const UserForm = () => {
  const modeVal = useSelector((state: RootState) => state.users.mode);
  const formValue = useSelector((state: RootState) => state.users.formValue);
  const id = useSelector((state: RootState) => state.users.selectedId);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userName = (data.get("userName") as string).trim();
    const city = (data.get("city") as string).trim();
    const age = Number(data.get("age"));

    if (!userName || !city || age <= 0) {
      alert("Fill Every Field");
      return;
    }

    if (modeVal === "save") {
      dispatch(addUser({ id: Date.now(), userName, city, age }));
    }

    if (modeVal === "update") {
      if (id == null) return;
      dispatch(updateUser({ formData: { userName, city, age }, id }));
      dispatch(selectIdNull());
    }

    dispatch(clearInputData());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const field = e.target.name as keyof UserFormData;
    const value: string | number =
      field === "age" ? Number(e.target.value) : e.target.value;
    dispatch(changeFormValue({ field, value }));
  };

  const handleDelete = (): void => {
    if (id == null) return;
    dispatch(deleteUser(id));
    dispatch(selectIdNull());
    dispatch(clearInputData());
  };

  return (
    <div>
      <div>
        <h1>Redux Route</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label>Name: </label>
            <input type="text" name="userName" value={formValue.userName ?? ""}
            onChange={handleChange}
            required /> */}
            <Input
              label="Name:"
              type="text"
              name="userName"
              value={formValue.userName ?? ""}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label>City: </label>
            <input type="text" name="city" value={formValue.city ?? ""}
            onChange={handleChange}
            required /> */}
            <Input
              label="City:"
              type="text"
              name="city"
              value={formValue.city ?? ""}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label>Age: </label>
              <input type="number" name="age" value={formValue.age ?? 0}
                onChange={handleChange}
              required /> */}
            <Input
              label="Age:"
              type="number"
              name="age"
              value={formValue.age ?? 0}
              onChange={handleChange}
            />
          </div>
          <br />
          {modeVal === "save" && <Button type="submit" label="Save" />}
          {modeVal === "update" && (
            <div style={{ display: "flex", gap: "10px" }}>
              {/* <button type="submit">Update</button> */}
              <Button type="submit" label="Update" />
              <Button type="button" label="Delete" onClick={handleDelete} />
            </div>
          )}
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserForm;
