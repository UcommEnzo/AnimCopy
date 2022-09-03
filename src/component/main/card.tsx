import React from "react";
import { YouTubeType } from "../../models/IMainPayload";

const MainPageCard = ({
  comments,
  id,
  image,
  timestamp,
  title,
  views,
  youtube_id,
}: YouTubeType) => {

  return (
    <div className="cardContainer" >
      <a href={`https://www.youtube.com/watch?v=${youtube_id}`} target="_blank">
        <img src={image}/>
      </a>
    </div>
  )
}

export default MainPageCard