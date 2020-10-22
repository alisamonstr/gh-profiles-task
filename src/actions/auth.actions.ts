import { createAction } from 'redux-act'

import { CLIENT_ID, CLIENT_SECRET } from '../constants'
import { AppThunk } from '../store'

export const setGithubToken = createAction<string>()
export const initialiseOctokit = createAction()
export const logout = createAction()

export const verifyCode = (code: string): AppThunk => async (dispatch) => {
  const result = await fetch(
    'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    },
  ).then((x) => x.json())

  dispatch(setGithubToken(result.access_token))
}
