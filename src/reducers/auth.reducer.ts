import { createReducer } from 'redux-act'
import { Octokit } from '@octokit/rest'

import { setGithubToken, logout, initialiseOctokit } from '../actions'

const defaultState = {
  githubToken: '',
  octokit: null as Octokit | null,
}

export const auth = createReducer({}, defaultState)

auth.on(setGithubToken, (state, payload) => ({
  ...state,
  githubToken: payload,
}))

auth.on(logout, () => defaultState)
auth.on(initialiseOctokit, (state) => ({
  ...state,
  octokit: new Octokit({ auth: state.githubToken }),
}))
