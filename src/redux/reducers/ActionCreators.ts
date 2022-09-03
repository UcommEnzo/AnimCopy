import { SearchType, AdvancedSearchType, GetTitlePayload } from './../../models/ISearchPayload';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  GetTitleData,
  SerieType,
} from './../../models/ITitlePayload';

const baseUrl = 'https://api.anilibria.tv/v2/'

export const getTitle = createAsyncThunk(
  'anime/getTitle',
  async (payload: GetTitlePayload, thunkAPI) => {
    const { code } = payload
    try {
      const {data: responce} = await axios.get(`${baseUrl}getTitle?code=${code}`)
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getRandomAnime = createAsyncThunk(
  'anime/getRandomAnime',
  async (_, thunkAPI) => {

    try {
      const {data: responce} = await axios.get(`${baseUrl}getRandomTitle`)
      const playlistArray: Array<SerieType> = []

      const playlistArr = Object.entries(responce.player.playlist)
      playlistArr.forEach(([key, value]) => {
        //@ts-ignore
        playlistArray.push(value)
      })
      responce.player.playlist = playlistArray
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getMainPage = createAsyncThunk(
  'anime/getMainPage',
  async (_, thunkAPI) => {
    try {
      const {data: responce} = await axios.get(`${baseUrl}getYouTube?limit=12`)
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getSchedule = createAsyncThunk(
  'anime/getSchedule',
  async (_, thunkAPI) => {
    const filter = 'id,torrents,posters,names,description,code'
    try {
      const {data: responce} = await axios.get(`${baseUrl}getSchedule?filter=${filter}`)
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getTeam = createAsyncThunk(
  'anime/getTeam',
  async (_, thunkAPI) => {
    try {
      const {data: responce} = await axios.get(`${baseUrl}getTeam`)
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const getYears = createAsyncThunk(
  'search/getYears',
  async (_, thunkAPI) => {
    try {
      const {data: responce} = await axios.get(`${baseUrl}getYears`)
      return responce.reverse()
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const getGenres = createAsyncThunk(
  'search/getGenres',
  async (_, thunkAPI) => {
    try {
      const {data: responce} = await axios.get(`${baseUrl}getGenres`)
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const searchTitles = createAsyncThunk(
  'search/searchTitles',
  async (payload: SearchType, thunkAPI) => {
    const {
      search = '',
      years = '',
      season_code = '',
      genres = '',
      //voice,
      //translator,
      //editing,
      //decor,
      //timing,
      filter = 'id,names',
      //remove,
      //include,
      //description_type,
      //playlist_type,
      limit = 10,
      after = 0,
    } = payload
    
    try {
      const {data: responce} = await axios.get( 
        `${baseUrl}searchTitles?search=${search}&limit=${limit}&filter=${filter}`
      )
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const advancedSearchTitles = createAsyncThunk(
  'search/advancedSearchTitles',
  async (payload: AdvancedSearchType, thunkAPI) => {
    const {
      query,	
      filter='id,torrents,posters,names,description,genres,season,status,code',
      remove,
      include,
      description_type,
      playlist_type,
      limit = 12,
      after = 0,
      order_by,
      sort_direction = 1
    } = payload
    
    try {
      const {data: responce} = await axios.get(
        `${baseUrl}advancedSearch?query=${query}&filter=${filter}&limit=${limit}&order_by=${order_by}&sort_direction=${sort_direction}`
      )
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getSidebarTitles = createAsyncThunk(
  'search/getSidebarTitles',
  async (_, thunkAPI) => {
    
    const query = '{season.code} >= 0 and {season.year} >= 0'	
    const filter ='id,torrents,posters,names,description,code'
    
    try {
      const {data: responce} = await axios.get(
        `https://api.anilibria.tv/v2/advancedSearch?query=${query}&filter=${filter}&limit=5&order_by=updated&sort_direction=1`
      )
      return responce
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)


export const getTitleData = async (payload: GetTitleData) => {
  try {
    const { random, titleCode} = payload
    const { data: responce } = await axios.get(
      random
        ? `https://api.anilibria.tv/v2/getRandomTitle`
        : `https://api.anilibria.tv/v2/getTitle?code=${titleCode}`
    )
    return responce
  } catch (e) {
    console.log(e.message)
  }
}