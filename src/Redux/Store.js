import {configureStore} from '@reduxjs/toolkit'
import  LoginSlice  from './Auth'
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

  const userConfig = {
    key: 'user',
    version: 1,
    storage,
  }
  const pUser = persistReducer(userConfig, LoginSlice)


export const store = configureStore({
    reducer: {
        user: pUser,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)

