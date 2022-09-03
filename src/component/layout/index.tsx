import React, { useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import './index.scss';
import Sidebar from './sidebar';
import Footer from './footer';
import Support from '../../assets/images/support.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSidebarTitles } from '../../redux/reducers/ActionCreators';


const Layout = () => {

  const dispatch = useAppDispatch()
  const {
    fetchingSidebarTitles, sidebarTitlesError, sidebarTitles
  } = useAppSelector(state => state.SearchReducer)

  const getTitles = () => {
    const payload = {
      query: `{season.code} >= 0 and {season.year} >= 0`,
      limit: 5,
      order_by: 'updated',
    }
    dispatch(getSidebarTitles())
  }

  useEffect(() => {
    !sidebarTitles.length && getTitles()
  }, [])

  return (
    <div className='layoutContainer'>
      <div className='bodyContainer'>
        <div className='mainContainer'>
          <div className='navBar'>
            <nav>
              <Link to="/">ГЛАВНАЯ</Link>
              <Link to="/releases">РЕЛИЗЫ</Link>
              <Link to="/schedule">РАСПИСАНИЕ</Link>
              <Link to="/random">СЛУЧАЙНОЕ</Link>
              <a href="https://anilibria.app/" target='_blank'>ПРИЛОЖЕНИЕ</a>
              <Link to="/team">КОМАНДА</Link>
              <a href="https://www.anilibria.tv/pages/donate.php"  target='_blank'>ПОДДЕРЖАТЬ ПРОЕКТ</a>
            </nav>
          </div>
          <div className='donate'>
            <Link to="/donate">
              <img src={Support}/>
            </Link>
          </div>
          <div className='contentContainer'>
            <Outlet />
          </div>
        </div>
        <Sidebar sidebarTitles={sidebarTitles}/>
      </div>
      <Footer />
    </div>
  )
}

export default Layout