import { createReducer } from 'redux-act'

import { Profile, setProfile } from '../actions'

interface Profiles {
  [key: string]: Profile
}

const defaultState = {} as Profiles

export const profiles = createReducer({}, defaultState)

profiles.on(setProfile, (state, payload) => ({
  ...state,
  [payload.profile.login]: payload,
}))
