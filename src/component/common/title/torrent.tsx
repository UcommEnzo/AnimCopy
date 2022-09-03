import moment from "moment";
import React, { useEffect } from "react";
import { TorrentsType } from "../../../models/ITitlePayload";
import hdd from "../../../assets/images/hdd.png";
import download from "../../../assets/images/download.png";
import seed from "../../../assets/images/seed.png";
import leech from "../../../assets/images/leech.png";
import ok from "../../../assets/images/ok.png";

const Torrent = ({
  list,
  series
}: TorrentsType) => {

  const convertToGB = (bytes: number) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  }

  const convertFromUnix = (timeStamp: number) => {
    return moment.unix(timeStamp).format("DD.MM.YYYY, HH:mm");
  }

  return (
    <div className="torrentsBlock">
      {list.map(torrent => {
        return (
          <div className="torrentLine" key={torrent.hash}>
            <div className="torrentSeries">
              Серия {`${series.string} [${torrent.quality.string}]`}
            </div>
            <div className="torrentWeith">
              <img src={hdd} /> {convertToGB(torrent.total_size)}
              <img src={seed} /> {torrent.seeders}
              <img src={leech} /> {torrent.leechers}
              <img src={ok} /> {torrent.downloads}
            </div>
            <div className="torrentAddedTime">
              Добавлен {convertFromUnix(torrent.uploaded_timestamp)}
            </div>
            <div className="torrentDownload">
              <img src={download} /> <a href={`https://www.anilibria.tv${torrent.url}`}>Скачать</a>
            </div>
          </div>)
      })}
    </div>
  )
}

export default Torrent