import { TitleType } from './../../models/ITitlePayload';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
//import { ContactsState } from './../../../models/IContacts';

import {
  getYears,
  getGenres,
  searchTitles,
  advancedSearchTitles,
  getSidebarTitles
  // @ts-ignore
} from './ActionCreators.ts';

interface SearchState {
  fetchingYears: boolean
  fetchingGenres: boolean
  fetchingSearchTitles: boolean
  fetchingAdvSearchTitles: boolean
  fetchingSidebarTitles: boolean
  getYearsError: string
  getGenresError: string
  searchTitlesError: string
  advSearchTitlesError: string
  sidebarTitlesError: string
  years: Array<number>
  genres: Array<string>
  titles: Array<TitleType>
  advancedTitles: Array<TitleType>
  sidebarTitles: Array<TitleType>
}

const initialState: SearchState = {
  fetchingYears: false,
  getYearsError: '',
  years: [],
  
  fetchingGenres: false,
  getGenresError: '',
  genres: [],

  fetchingSearchTitles: false,
  searchTitlesError: '',
  titles: [],

  fetchingAdvSearchTitles: false,
  advSearchTitlesError: '',
  advancedTitles: [],
  
  fetchingSidebarTitles: false,
  sidebarTitlesError: '',
  sidebarTitles: [],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [getYears.pending.type]: (state) => {
      state.fetchingYears = true
    },
    [getYears.fulfilled.type]: (state, action: PayloadAction<number[]>) => {
      state.fetchingYears = false
      state.getYearsError = ''
      state.years = action.payload
    },
    [getYears.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingYears = false
      state.getYearsError = action.payload
    },

    [getGenres.pending.type]: (state) => {
      state.fetchingGenres = true
    },
    [getGenres.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.fetchingGenres = false
      state.getGenresError = ''
      state.genres = action.payload
    },
    [getGenres.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingGenres = false
      state.getGenresError = action.payload
    },

    [searchTitles.pending.type]: (state) => {
      state.fetchingSearchTitles = true
    },
    [searchTitles.fulfilled.type]: (state, action: PayloadAction<TitleType[]>) => {
      state.fetchingSearchTitles = false
      state.searchTitlesError = ''
      state.titles = action.payload
    },
    [searchTitles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingSearchTitles = false
      state.searchTitlesError = action.payload
    },

    [advancedSearchTitles.pending.type]: (state) => {
      state.fetchingAdvSearchTitles = true
    },
    [advancedSearchTitles.fulfilled.type]: (state, action: PayloadAction<TitleType[]>) => {
      state.fetchingAdvSearchTitles = false
      state.advSearchTitlesError = ''
      state.advancedTitles = action.payload
    },
    [advancedSearchTitles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingAdvSearchTitles = false
      state.advSearchTitlesError = action.payload
    },
    
    [getSidebarTitles.pending.type]: (state) => {
      state.fetchingSidebarTitles = true
    },
    [getSidebarTitles.fulfilled.type]: (state, action: PayloadAction<TitleType[]>) => {
      state.fetchingSidebarTitles = false
      state.sidebarTitlesError = ''
      state.sidebarTitles = action.payload
    },
    [getSidebarTitles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingSidebarTitles = false
      state.sidebarTitlesError = action.payload
    }
  }
})

export default searchSlice.reducer