import { createAction } from 'redux-act'
import { ReposGetResponseData } from '@octokit/types'

import { AppThunk } from '../store'

export interface Repository {
  repo: ReposGetResponseData
  readme: string
}

export const setRepository = createAction<Repository>()

export const getRepository = (owner: string, repo: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const {
    auth: { octokit },
    repositories,
  } = getState()

  if (repositories[`${owner}/${repo}`]) {
    return
  }

  const [repoResponse, readmeData] = await Promise.all([
    octokit?.repos.get({ owner, repo }),
    octokit?.repos.getReadme({ owner, repo }).catch(() => ({} as any)),
  ])

  if (!repoResponse?.data) {
    throw new Error('Something went wrong')
  }

  const parsedReadme = readmeData?.data?.content ? atob(readmeData.data.content!) : ''

  dispatch(setRepository({ repo: repoResponse.data, readme: parsedReadme }))
}
