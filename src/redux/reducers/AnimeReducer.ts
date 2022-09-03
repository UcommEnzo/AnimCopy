import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TitleType } from "../../models/ITitlePayload";
import { YouTubeType } from "../../models/IMainPayload";
import {
  getTitle,
  getRandomAnime,
  getMainPage,
  getSchedule,
  getTeam,
  // @ts-ignore
} from './ActionCreators.ts';
import { ScheduleType } from "../../models/ISchedulePayload";
//import { AuthState } from "../../../models/IAuth";

interface AnimeState {
  fetchingTitle: boolean
  fetchingRandomAnime: boolean
  fetchingGetMainPage: boolean
  fetchingGetSchedule: boolean
  fetchingGetTeam: boolean
  getTitleError: string
  getRandomAnimeError: string
  getMainPageError: string
  getScheduleError: string
  getTeamError: string
  title: TitleType
  titleData: TitleType
  mainPageData: Array<YouTubeType> | null
  scheduleData: Array<ScheduleType> | null
  teamData: any
}

const initialState: AnimeState = {

  fetchingTitle: false,
  getTitleError: '',
  title: {
    announce: '',
    blocked: {
      bakanim: false,
      blocked: false
    },
    code: '',
    description: '',
    genres: [],
    id: null,
    in_favorites: null,
    last_change: null,
    names: {
      alternative: '',
      en: '',
      ru: ''
    },
    player: {
      alternative_player: '',
      host: '',
      playlist: null,
      series: {
        first: null,
        last: null,
        string: ''
      }
    },
    posters: {
      medium: {
        raw_base64_file: '',
        url: '',
      },
      original: {
        raw_base64_file: '',
        url: '',
      },
      small: {
        raw_base64_file: '',
        url: '',
      }
    },
    season: {
      code: null,
      string: '',
      week_day: null,
      year: null,
    },
    status: {
      code: null,
      string: ''
    },
    team: {
      decor: [],
      editing: [],
      timing: [],
      translator: [],
      voice: [],
    },
    torrents: {
      list: [],
      series: {
        first: null,
        last: null,
        string: ''
      }
    },
    type: {
      code: null,
      full_string: '',
      length: null,
      series: null,
      string: ''
      }
  },
  
  fetchingRandomAnime: false,
  getRandomAnimeError: '',
  titleData: {
    announce: '',
    blocked: {
      bakanim: false,
      blocked: false
    },
    code: '',
    description: '',
    genres: [],
    id: null,
    in_favorites: null,
    last_change: null,
    names: {
      alternative: '',
      en: '',
      ru: ''
    },
    player: {
      alternative_player: '',
      host: '',
      playlist: null,
      series: {
        first: null,
        last: null,
        string: ''
      }
    },
    posters: {
      medium: {
        raw_base64_file: '',
        url: '',
      },
      original: {
        raw_base64_file: '',
        url: '',
      },
      small: {
        raw_base64_file: '',
        url: '',
      }
    },
    season: {
      code: null,
      string: '',
      week_day: null,
      year: null,
    },
    status: {
      code: null,
      string: ''
    },
    team: {
      decor: [],
      editing: [],
      timing: [],
      translator: [],
      voice: [],
    },
    torrents: {
      list: [],
      series: {
        first: null,
        last: null,
        string: ''
      }
    },
    type: {
      code: null,
      full_string: '',
      length: null,
      series: null,
      string: ''
      }
  },

  fetchingGetMainPage: false,
  getMainPageError: '',
  mainPageData: null,

  fetchingGetSchedule: false,
  getScheduleError: '',
  scheduleData: null,

  fetchingGetTeam: false,
  getTeamError: '',
  teamData: null,
}

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    // userLogout(state) {
    //   state.isAuth = false
    // }
  },
  extraReducers: {
    
    [getTitle.pending.type]: (state) => {
      state.fetchingTitle = true
    },
    [getTitle.fulfilled.type]: (state, action: PayloadAction<TitleType>) => {
      state.fetchingTitle = false
      state.getTitleError = ''
      state.title = action.payload
    },
    [getTitle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingTitle = false
      state.getTitleError = action.payload
    },

    [getRandomAnime.pending.type]: (state) => {
      state.fetchingRandomAnime = true
    },
    [getRandomAnime.fulfilled.type]: (state, action: PayloadAction<TitleType>) => {
      state.fetchingRandomAnime = false
      state.getRandomAnimeError = ''
      state.titleData = action.payload
    },
    [getRandomAnime.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingRandomAnime = false
      state.getRandomAnimeError = action.payload
    },

    [getMainPage.pending.type]: (state) => {
      state.fetchingGetMainPage = true
    },
    [getMainPage.fulfilled.type]: (state, action: PayloadAction<YouTubeType[]>) => {
      state.fetchingGetMainPage = false
      state.getMainPageError = ''
      state.mainPageData = action.payload
    },
    [getMainPage.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingGetMainPage = false
      state.getMainPageError = action.payload
    },

    [getSchedule.pending.type]: (state) => {
      state.fetchingGetSchedule = true
    },
    [getSchedule.fulfilled.type]: (state, action: PayloadAction<ScheduleType[]>) => {
      state.fetchingGetSchedule = false
      state.getScheduleError = ''
      state.scheduleData = action.payload
    },
    [getSchedule.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingGetSchedule = false
      state.getScheduleError = action.payload
    },

    [getTeam.pending.type]: (state) => {
      state.fetchingGetTeam = true
    },
    [getTeam.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.fetchingGetTeam = false
      state.getTeamError = ''
      state.teamData = action.payload
    },
    [getTeam.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingGetTeam = false
      state.getTeamError = action.payload
    },
  }
})

// export const getRandomAnime = () => (dispatch) => {
//   dispatch(animeSlice.actions.userLogout())
// }

export default animeSlice.reducer