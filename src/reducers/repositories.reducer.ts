import { createReducer } from 'redux-act'

import { setRepository, Repository } from '../actions'

interface Repositories {
  [key: string]: Repository
}

const defaultState = {} as Repositories

export const repositories = createReducer({}, defaultState)

repositories.on(setRepository, (state, payload) => ({
  ...state,
  [payload.repo.full_name]: payload,
}))
