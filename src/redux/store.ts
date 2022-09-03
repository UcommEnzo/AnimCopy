import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AnimeReducer from "./reducers/AnimeReducer"
import SearchReducer from "./reducers/SearchReducer"

const rootReducers = combineReducers({
  AnimeReducer,
  SearchReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers
})}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']