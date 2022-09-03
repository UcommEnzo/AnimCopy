import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getRandomAnime, getTitle, getTitleData } from "../../../redux/reducers/ActionCreators";
import './index.scss';
import { SerieType, TitleType } from "../../../models/ITitlePayload";
import Torrent from "./torrent";
import vk from "../../../assets/images/vk.jpg"
import tg from "../../../assets/images/tg.jpg"
import discord from "../../../assets/images/discord.jpg"
import { stat } from "fs";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { titleDefaultState } from "./constants";
import Player from "./Player";

type InfoString = {
  stingName?: string
  stringDescr?: string
  cName: string
  titleName?: {
    ru: string
    en: string
  }
  titleDescription?: string
}

type socialNetImage = {
  link: string
  img: string
}

type Title = {
  random?: boolean
}

const InfoString = ({ cName, stingName, stringDescr, titleName, titleDescription }: InfoString) => {

  return (
    <div className={cName}>
      {titleName &&
        <div>
          {titleName.ru}<br />{titleName.en}
        </div>
      }
      {stingName && !!stringDescr?.length && <b>{stingName}</b>}
      {stringDescr && <span>{stringDescr}</span>}
      {titleDescription && <>{titleDescription}</>}
    </div>
  )
}

const SocialNetImage = ({ link, img }: socialNetImage) => {
  return (
    <a href={link} target="_blank">
      <img src={img} />
    </a>
  )
}

type PlaylistType = {
  title: string
  file: string
  skip: string
}

const Title = ({random = false}: Title) => {

  const [titleData, setTitleData] = useState<TitleType>(titleDefaultState)
  const [titleIsFetching, setTitleIsFetching] = useState(false)
  let { titleCode } = useParams()
  let location = useLocation()
  const playlist: PlaylistType[] = []

  const {
    announce,
    blocked,
    description,
    genres,
    code,
    id,
    in_favorites,
    last_change,
    names,
    player,
    posters,
    season,
    status,
    team,
    torrents,
    type
  } = titleData

  const host = titleData.player.host

  
  useEffect(() => {
    const payload = {
      titleCode: titleCode || "",
      random
    }
    setTitleIsFetching(true)
    getTitleData(payload).then(title => {
      setTitleIsFetching(false)
      setTitleData(title)
    })

  }, [titleCode, location.key])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const createPlaylist = () => {
    for (var key in titleData.player.playlist) {
      const skipStart = titleData.player.playlist[key].skips.opening[0]
      const skipEnd = titleData.player.playlist[key].skips.opening[1]
      const urlStart = `https://${host}`
      const videoUrls = titleData.player.playlist[key].hls
      playlist.push({
        title: 'Серия ' + key,
        file: `[480p]${urlStart}${videoUrls.sd},[720p]${urlStart}${videoUrls.hd},[1080p]${urlStart}${videoUrls.fhd}`,
        skip: `${skipStart || null} - ${skipEnd || null}`
        })
      }
    }

  !playlist.length && createPlaylist()
    
    const infoData = [
    {
      cName: 'titleName', titleName: {
        ru: names.ru,
        en: names.en
      }
    },
    { cName: 'season', stingName: 'Сезон: ', stringDescr: 
      (season.year != null ? season.year : '') + ' ' + season.string
    },
    { cName: 'type', stingName: 'Тип: ', stringDescr: type.full_string },
    { cName: 'genre', stingName: 'Жанры: ', stringDescr: genres.join(', ') },
    { cName: 'voice', stingName: 'Озвучка: ', stringDescr: team.voice.join(', ') },
    { cName: 'timing', stingName: 'Тайминг: ', stringDescr: team.timing.join(', ') },
    { cName: 'subtitles', stingName: 'Работа над субтитрами: ', stringDescr: team.decor.join(', ') },
    { cName: 'description', titleDescription: description },
  ]

  const socialImageData = [
    { link: "https://vk.com/anilibria", img: vk },
    { link: "tg://resolve?domain=anilibria_tv", img: tg },
    { link: "https://discord.gg/M6yCGeGN9B", img: discord }
  ]

  return (
    <div className="titleWrapper">
      <div className="titleContainer">
        <div className="infoBlock">
          {infoData && <div className="titleInfo">
            {infoData.map(string => {
            return <InfoString {...string} key={string.cName} />})}
          </div>}
          <div className="titlePoster">
            <img src={`https://www.anilibria.tv${posters.medium.url}`} />
          </div>
        </div>

        <div className="videoBlock">
          <div className="playerJS" style={{width: '840px', height: '530px'}}>
            <Player id="player" file={playlist}/>
          </div>
          <Torrent {...torrents} />
        </div>
        {/* <div className="chatBlock">
          chatBlock
        </div> */}
      </div>
      <div className="socialNetBlock">
        {socialImageData.map(social => {
          return <SocialNetImage {...social} key={social.link} />
        })}
      </div>
    </div>
  )
}

export default Title