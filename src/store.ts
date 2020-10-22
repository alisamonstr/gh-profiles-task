import { applyMiddleware, createStore, combineReducers, Action } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import thunk, { ThunkAction } from 'redux-thunk'

import * as reducers from './reducers'

const userPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['githubToken'],
}

const rootReducer = combineReducers({
  ...reducers,
  auth: persistReducer(userPersistConfig, reducers.auth),
})

// Create the store
export const store = applyMiddleware(thunk)(createStore)(rootReducer)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void, ActionType = string> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<ActionType>
>
