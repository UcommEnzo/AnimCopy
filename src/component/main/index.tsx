import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMainPage } from '../../redux/reducers/ActionCreators';
import MainPageCard from './card';
import './index.scss';

const Main = ({}) => {

  const dispatch = useAppDispatch()
  const { fetchingGetMainPage, getMainPageError, mainPageData } = useAppSelector(state => state.AnimeReducer)

  useEffect(() => {
    dispatch(getMainPage())
  }, [])


  return (
    <div className='mainPageContainer'>
      {mainPageData?.map(youTubeCard => {
        return <MainPageCard {...youTubeCard} key={youTubeCard.id}/>
      })}
    </div>
  );
}

export default Main;
