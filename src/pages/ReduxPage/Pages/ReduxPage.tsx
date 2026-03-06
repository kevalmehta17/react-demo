import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/UserStore'
import UserForm from '../components/UserForm'
import UserSelectId from '../components/UserSelectId'
import FilterPanel from '../components/FilterPanel'
import UserTableList from '../components/UserTableList'

const ReduxPage = () => {
  return (
    <Provider store={store}>
      <UserForm />
      <UserSelectId />
      <FilterPanel />
      <UserTableList />
    </Provider>
  )
}

export default ReduxPage
