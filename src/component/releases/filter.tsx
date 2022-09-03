import React, { useEffect, useState } from 'react';
import { Select, Switch, Button } from 'antd';
import { CheckSquareOutlined, BorderOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { SearchType } from '../../models/ISearchPayload';

type FilterTypes = {
  years: Array<number>
  genres: Array<string>
  getTitles: (payload: SearchType) => void
  toggleNewOrPop: (value: boolean) => void
  setSelectedGenres: (value: Array<string>) => void
  setSelectedYears: (value: Array<string>) => void
  setSelectedSeasons: (value: Array<string>) => void
  isReleaseEnded: boolean
  setIsReleaseEnded: (value: boolean) => void
  toggleDisabled: boolean
}

const Filter = ({
  years,
  genres,
  getTitles,
  toggleNewOrPop,
  setSelectedGenres,
  setSelectedYears,
  setSelectedSeasons,
  isReleaseEnded,
  setIsReleaseEnded,
  toggleDisabled
}: FilterTypes) => {

  const { Option } = Select;
  const seasons = [
    { name: 'зима', code: 1 },
    { name: 'весна', code: 2 },
    { name: 'лето', code: 3 },
    { name: 'осень', code: 4 }
  ]
  const toggleReleseEnded = () => {
    setIsReleaseEnded(!isReleaseEnded)
  }
  const selectedGenres: Array<React.ReactNode> = [];
  const selectedYears: Array<React.ReactNode> = [];
  const selectedSeasons: Array<React.ReactNode> = [];

  genres.forEach(genre => {
    selectedGenres.push(<Option key={genre}>{genre}</Option>);
  });

  years.forEach(year => {
    selectedYears.push(<Option key={year}>{year}</Option>);
  });

  seasons.forEach(season => {
    selectedSeasons.push(<Option key={season.name}>{season.name}</Option>);
  });


  return (
    <div className='filterContainer'>
      <div className='genresSelect'>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', borderRadius: '4px' }}
          placeholder="Выбрать жанры"
          defaultValue={[]}
          onChange={setSelectedGenres}
        >
          {selectedGenres}
        </Select>
      </div>
      <div className='yearsSelect'>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', borderRadius: '4px' }}
          placeholder="Год"
          defaultValue={[]}
          onChange={setSelectedYears}
        >
          {selectedYears}
        </Select>
      </div>
      <div className='seasonsSelect'>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', borderRadius: '4px' }}
          placeholder="Сезон"
          defaultValue={[]}
          onChange={setSelectedSeasons}
        >
          {selectedSeasons}
        </Select>
      </div>
      <div className='btn switch'>
        <Switch
          className='switcher'
          checkedChildren="Новое"
          unCheckedChildren="Популярное"
          defaultChecked={true}
          onClick={toggleNewOrPop}
          disabled={toggleDisabled}
        />
      </div>
      <div className='btn show'>
        <Button
          //@ts-ignore
          onClick={getTitles}>
          Показать
        </Button>
      </div>
      <div className='btn catalogFinish'>
        <Button
          icon={isReleaseEnded ? <CheckSquareOutlined/> : <BorderOutlined/>}
          onClick={toggleReleseEnded}
        >
          Релиз завершён
        </Button></div>
      <div className='btn alphabet'>
        АЛФАВИТНЫЙ УКАЗАТЕЛЬ
      </div>
    </div>
  )
}

export default Filter