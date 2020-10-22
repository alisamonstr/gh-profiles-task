import { createReducer } from 'redux-act'
import { UsersListResponseData } from '@octokit/types'

import { setUsers, setUsersError, setUsersLoading } from '../actions'

const defaultState = {
  isLoading: false,
  error: '',
  users: [] as UsersListResponseData,
}

export const users = createReducer({}, defaultState)

users.on(setUsersLoading, (state, payload) => ({
  ...state,
  isLoading: payload,
}))

users.on(setUsersError, (state, payload) => ({
  ...state,
  error: payload,
}))

users.on(setUsers, (state, payload) => ({
  ...state,
  users: payload,
}))
