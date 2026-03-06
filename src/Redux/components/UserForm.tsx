import { useDispatch, useSelector } from "react-redux";
import { addUser, changeFormValue, clearInputData, deleteUser, selectIdNull, updateUser } from "../store/UserSlice";

const UserForm = () => {
  const modeVal = useSelector(state => state.user.mode);
  const dispatch = useDispatch();
  const formValue = useSelector(state => state.user.formValue);
  const id = useSelector(state => state.user.selectedId);


  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) : void =>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userName = (data.get("userName") as string).trim();
    const city = (data.get('city') as string).trim();
    const age = Number(data.get("age"));
    // check the Validation
    if(!userName || !city || !age){
        alert("Fill Every Field");
        return;
    }
    if(modeVal === "save"){
        const formData = {id : +new Date(), userName, city, age};
        dispatch(addUser(formData));
    }
    
    if(modeVal === "update"){
      const formData = {userName, city, age};
      dispatch(updateUser({formData, id}))
      dispatch(selectIdNull());
    }
    dispatch(clearInputData());
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    const field = e.target.name;
    console.log("field", field);
    const value : string | number = e.target.value;
    console.log("value", value);
    dispatch(changeFormValue({field, value}));
  }

  const handleDelete = () : void => {
    if(!id) return;
    dispatch(deleteUser(id));
    dispatch(selectIdNull());
    dispatch(clearInputData());
  }

  return (
    <div>
      <div>
        <h1>Redux Route</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input type="text" name="userName" value={formValue.userName ?? ""}
            onChange={handleChange}
            required />
          </div>
          <div>
            <label>City: </label>
            <input type="text" name="city" value={formValue.city ?? ""}
            onChange={handleChange}
            required />
          </div>
          <div>
            <label>Age: </label>
            <input type="number" name="age" value={formValue.age ?? 0}
              onChange={handleChange}
            required />
          </div>
          <br />
          {modeVal === "save" && <button type="submit">Save</button>}
          {modeVal === "update" && (
            <>
              <button type="submit">Update</button>
              <button type="button" onClick={handleDelete}>Delete</button>
            </>
          )}
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserForm;
