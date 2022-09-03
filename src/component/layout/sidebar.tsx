import React, { useState, useEffect, useCallback, useRef } from "react"
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { TitleType } from "../../models/ITitlePayload"
import TitleCard from "../common/titleCard"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useDebounce from "../../hooks/other";
import axios from "axios";
import { Link } from "react-router-dom";

type PropsType = {
  sidebarTitles: Array<TitleType>
}

const searchTitles = async (searchValue: string) => {
  try {
    const { data: responce } = await axios.get(
      `https://api.anilibria.tv/v2/searchTitles?search=${searchValue}&limit=12&filter=id,names,code`
    )
    return responce
  } catch (e) {
    console.log(e.message)
  }
}

const Sidebar = ({ sidebarTitles }: PropsType) => {

  const [findedTitles, setFindedTitles] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearching, setIsSearching] = useState(false)
  const [inuptInFocus, setInuptInFocus] = useState(false)

  const debouncedSearchValue = useDebounce(searchValue, 700);

  useEffect(() => {
    if (debouncedSearchValue?.length > 2) {
      setIsSearching(true)
      searchTitles(debouncedSearchValue).then(titles => {
        setIsSearching(false)
        setFindedTitles(titles);
      })
    } else {
      setFindedTitles([]);
    }
  }, [debouncedSearchValue])

  const hideDropDown = () => {
    setTimeout(() => setInuptInFocus(false), 200)
  }
  
  return (
    <div className='sidebar'>
      <div className="searchBlock">
        <div className="search">
          <Input
            placeholder="Найти аниме по названию"
            suffix={<SearchOutlined />}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={(e) => setInuptInFocus(true)}
            onBlur={hideDropDown}
          />
        </div>
        <div className="searchDropDown">
          {inuptInFocus && findedTitles?.map((title) => {
            return <Link to={`/title/${title.code}`} className="titleLink" key={title.id}>
              <div>
                {title.names.ru}
              </div>
            </Link>
          })}
        </div>
      </div>
      <div className="sidebarTitles">
        {sidebarTitles.map(title => {
          return <TitleCard cardType="sidebar" title={title} key={title.id} />
        })}
      </div>
    </div>
  )
}

export default Sidebar