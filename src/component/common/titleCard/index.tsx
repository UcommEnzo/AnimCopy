import React from "react"
import 'antd/dist/antd.min.css';
import { TitleType } from "../../../models/ITitlePayload"
import './index.scss';
import { Link } from "react-router-dom";

type PropsType = {
  title: TitleType
  cardType?: string
}

const TitleCard = ({title, cardType = ''}: PropsType) => {
  const {
    announce,
    blocked,
    code,
    description,
    genres,
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
  } = title
  
  const cardNames = {
    cardClassName: '',
    imageClassName: '',
    descrClassName: ''
  }
  switch (cardType) {
    case 'sidebar':
      cardNames.cardClassName = 'titleCard side'
      cardNames.imageClassName = 'titleImage side'
      cardNames.descrClassName = 'titleDescription side'
      break;
    case 'releases':
      cardNames.cardClassName = 'titleCard releases'
      cardNames.imageClassName = 'titleImage releases'
      cardNames.descrClassName = 'titleDescription releases'
      break;
    default:
      cardNames.cardClassName = 'titleCard schedule'
      cardNames.imageClassName = 'titleImage'
      cardNames.descrClassName = 'titleDescription'
      break;
  }

  const dataNotFound = 'нет данных'

  return (
    <Link to={`/title/${code}`} className={cardNames.cardClassName}>
      <img
        className={cardNames.imageClassName}
        src={`https://www.anilibria.tv${posters.small.url}`}
        alt=''
      />
      <div className={cardNames.descrClassName}>
        <p>{names?.ru || dataNotFound}</p>
        <p>Серия: {torrents.series?.string || dataNotFound}</p>
        <p>{description?.slice(0, 96) || dataNotFound}...</p>
      </div>
    </Link>
  )
}

export default TitleCard