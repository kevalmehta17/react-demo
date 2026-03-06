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

export default ContextPage;