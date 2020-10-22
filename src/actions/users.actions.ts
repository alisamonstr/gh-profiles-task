import { createAction } from 'redux-act'
import { UsersListResponseData } from '@octokit/types'

import { AppThunk } from '../store'

export const setUsers = createAction<UsersListResponseData>()
export const setUsersLoading = createAction<boolean>()
export const setUsersError = createAction<string>()

export const getUsers = (): AppThunk => async (dispatch, getState) => {
  const {
    auth: { octokit },
    users: { users },
  } = getState()

  if (users.length) {
    return
  }

  dispatch(setUsersLoading(true))

  const response = await octokit?.users.list({
    per_page: 10,
    since: String(Math.round(Math.random() * 10000)),
  })

  if (!response?.data) {
    dispatch(setUsersLoading(false))
    return dispatch(setUsersError('Something went wrong'))
  }

  dispatch(setUsers(response?.data ?? []))
  dispatch(setUsersLoading(false))
}
