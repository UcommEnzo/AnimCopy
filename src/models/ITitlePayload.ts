export interface SerieType {
  serie: number
  created_timestamp: number
  preview: string | null
  hls: {
    fhd: string | null
    hd: string | null
    sd: string | null
  }
  skips: {
    ending: Array<any>
    opening: Array<any>
  }
}

export interface SeriesType {
  first: number | null
  last: number | null
  string: string
}

export interface PlayerType {
  alternative_player: string | null
  host: string
  playlist: any // SerieType // Позже попытаться решить проблему с изменяемым числом возможных объектов
  series: SeriesType
}

export interface ListType {
  downloads: number
  hash: string
  leechers: number
  metadata: string | null
  quality: {
    string: string
    type: string
    resolution: string
    encoder: string
    lq_audio: string | null
  }
  raw_base64_file: string | null
  seeders: number
  series: SeriesType
  torrent_id: number
  total_size: number
  uploaded_timestamp: number
  url: string
}

export interface TorrentsType {
  list: Array<ListType>
  series: SeriesType
}

export interface TitleType {
  announce: string | null
  blocked: {
    bakanim: boolean
    blocked: boolean
  }
  code: string
  description: string
  genres: Array<string>
  id: number | null
  in_favorites: number | null
  last_change: number | null
  names: {
    alternative: string | null
    en: string
    ru: string
  }
  player: PlayerType
  posters: {
    medium: {
      raw_base64_file: string | null
      url: string
    }
    original: {
      raw_base64_file: string | null
      url: string
    }
    small: {
      raw_base64_file: string | null
      url: string
    }
  }
  season: {
    code: number | null
    string: string
    week_day: number | null
    year: number | null
  }
  status: {
    code: number | null
    string: string
  }
  team: {
    decor: Array<string>
    editing: Array<string>
    timing: Array<string>
    translator: Array<string>
    voice: Array<string>
  }
  torrents: TorrentsType
  type: {
    code: number | null
    full_string: string
    length: number | null
    series: number | null
    string: string
  }
}

export interface GetTitleData {
  random?: boolean
  titleCode: string
}