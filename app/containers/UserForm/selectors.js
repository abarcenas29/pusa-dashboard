import { createSelector } from 'reselect'

export const containerUserFormRedux = () => s =>
  s.containerUserForm

export const isLoadingSelector = () => createSelector(
  containerUserFormRedux(),
  s => s ? s.isLoading : false
)

export const userFormSelector = () => createSelector(
  containerUserFormRedux(),
  s => {
    if (!s) return {}
    let employees = {}
    const { userForm } = s

    if (userForm.employees) {
      employees = userForm.employees[0]
    }
    return {
      ...userForm,
      employees
    }
  }
)
