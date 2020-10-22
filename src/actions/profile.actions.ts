import { createAction } from 'redux-act'
import { UsersGetByUsernameResponseData } from '@octokit/types'

import { AppThunk } from '../store'

export interface Profile {
  profile: UsersGetByUsernameResponseData
  repos: any
  activity: any
}

export const setProfile = createAction<Profile>()

export const getProfile = (username: string): AppThunk => async (dispatch, getState) => {
  const {
    auth: { octokit },
    profiles,
  } = getState()

  if (profiles[username]) {
    return
  }

  const [profileResponse, reposResponse, activityResponse] = await Promise.all([
    octokit?.users.getByUsername({ username }),
    octokit?.repos.listForUser({ username }),
    octokit?.activity.listPublicEventsForUser({ username, per_page: 100 }),
  ])

  if (!profileResponse?.data || !reposResponse?.data || !activityResponse?.data) {
    throw new Error('Something went wrong')
  }

  dispatch(
    setProfile({
      profile: profileResponse.data,
      repos: reposResponse.data,
      activity: activityResponse.data,
    }),
  )
}
