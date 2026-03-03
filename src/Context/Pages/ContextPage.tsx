import FilterPanel from "../components/FilterPanel.tsx"
import UserForm from "../components/UserForm.tsx"
import UserSelectId from "../components/UserSelectId.tsx"
import UserTableList from "../components/UserTableList.tsx"
import UserProvider from "../store/UserProvider.tsx"

const ContextPage = () => {
  return (
    <UserProvider>
      <UserForm />
      <UserSelectId />
      <FilterPanel />
      <UserTableList />
    </UserProvider>
  )
}

export default ContextPage

// src/Context/
// ├── store/
// │   ├── UserContext.tsx       ← createContext + type for context value
// │   └── UserProvider.tsx      ← useReducer + handler logic + <Provider>
// │
// ├── components/
// │   ├── UserForm.tsx          ← form (add / update mode)
// │   ├── UserSelectId.tsx        ← dropdown to select user for edit/delete
// │   ├── FilterPanel.tsx       ← field selector + unique value filter + buttons
// │   └── UserTableList.tsx          ← renders filtered user rows/table
// │
// └── Pages/
//     └── ContextPage.tsx       ← wraps with <UserProvider>, composes components