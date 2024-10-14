import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/productSlice'
import { productApi } from './features/productApi'

export const store = configureStore({
  reducer: {
    productR: productSlice,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch