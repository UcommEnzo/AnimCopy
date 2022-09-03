import React, { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination, Space, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { TitleType } from '../../models/ITitlePayload';
import { getGenres, getYears, searchTitles, advancedSearchTitles } from '../../redux/reducers/ActionCreators';
import Filter from './filter';
import './index.scss';
import TitleCard from '../common/titleCard'
import { configureStore } from '@reduxjs/toolkit';


const Releases = ({ }) => {

  const dispatch = useAppDispatch()
  const {
    fetchingYears, getYearsError, years,
    fetchingGenres, getGenresError, genres,
    fetchingAdvSearchTitles, advSearchTitlesError, advancedTitles
  } = useAppSelector(state => state.SearchReducer)

  const [titles, setTitles] = useState<TitleType[]>([])
  const [isSortingByNew, setIsSortingByNew] = useState(true)
  const [sortedTitles, setSortedTitles] = useState<TitleType[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([])
  const [isReleaseEnded, setIsReleaseEnded] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const paginationLenght =
    selectedGenres.length || selectedYears.length || selectedSeasons.length || isReleaseEnded
      ? sortedTitles.length
      : advancedTitles.length

  const toggleNewOrPop = () => {
    setIsSortingByNew(!isSortingByNew)
  }

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  const getTitles = () => {
    const payload = {
      query: `{season.code} >= 0 and {season.year} >= 0`,
      limit: -1,
      order_by: isSortingByNew ? 'updated' : 'in_favorites',
    }
    dispatch(advancedSearchTitles(payload))
  }

  useEffect(() => {
    dispatch(getYears())
    dispatch(getGenres())
    getTitles()
  }, [])

  useEffect(() => {
    advancedTitles.length && getTitles()
  }, [isSortingByNew])

  useEffect(() => {
    const start = (pageNumber - 1) * 12
    const end = pageNumber * 12
    const titlesArray = selectedGenres.length || selectedYears.length || selectedSeasons.length
      ? sortedTitles
      : advancedTitles
    const pageNumberTitles = titlesArray.slice(start, end)
    setTitles(pageNumberTitles)
  }, [pageNumber, advancedTitles, sortedTitles])

  const filterReleseEnded = () => {
    const titles: Array<TitleType> = []
    advancedTitles.forEach(title => {
      title.status.code === 2 && titles.push(title)
    })
    return titles
  }

  const filterTitles = () => {
    setPageNumber(1)
    const titlesForFilter = isReleaseEnded ? filterReleseEnded() : advancedTitles
    const titles: Array<TitleType> = titlesForFilter.filter(title => {
      const titleYear = title.season.year?.toString()
      const titleGenres = title.genres
      const titleSeasons = title.season.string

      const filterYear = selectedYears.length && titleYear && selectedYears.includes(titleYear)
      const filterGenres = selectedGenres.some(genre => titleGenres.includes(genre))
      const filterSeasons = selectedSeasons.some(season => titleSeasons == season)

      if (selectedYears.length && selectedGenres.length && selectedSeasons.length) {
        return filterYear && filterGenres && filterSeasons
      } else if (selectedYears.length && selectedGenres.length) {
        return filterYear && filterGenres
      } else if (selectedYears.length && selectedSeasons.length) {
        return filterYear && filterSeasons
      } else if (selectedGenres.length && selectedSeasons.length) {
        return filterGenres && filterSeasons
      } else if (selectedYears.length) {
        return filterYear
      } else if (selectedGenres.length) {
        return filterGenres
      } else if (selectedSeasons.length){
        return filterSeasons
      } else if (isReleaseEnded) return true
    })
    setSortedTitles(titles)
  }

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Сюда</a>;
    }
    if (type === 'next') {
      return <a>Туда</a>;
    }
    return originalElement;
  };


  return (
    <div className='releasesContaier'>
      <div className='filterWrapper'>
        <Filter
          years={years}
          genres={genres}
          getTitles={filterTitles}
          toggleNewOrPop={toggleNewOrPop}
          toggleDisabled={fetchingAdvSearchTitles}
          setSelectedGenres={setSelectedGenres}
          setSelectedYears={setSelectedYears}
          setSelectedSeasons={setSelectedSeasons}
          isReleaseEnded={isReleaseEnded}
          setIsReleaseEnded={setIsReleaseEnded}
        />
      </div>
      <div className='titleWrapper'>
        {fetchingAdvSearchTitles || fetchingYears || fetchingGenres
          ? <div className='preloader'>
            <Spin size="large" />
          </div>
          : titles.map((title: TitleType) => {
            return <TitleCard title={title} cardType="releases" key={title.id} />
          })}
      </div>
      <div className='pagination'>
        <Pagination
          total={paginationLenght}
          itemRender={itemRender}
          defaultPageSize={12}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Releases;
