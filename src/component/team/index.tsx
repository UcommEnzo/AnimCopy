import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTeam } from '../../redux/reducers/ActionCreators';
import './index.scss';
import { Leagues } from './teamList';

const Team = ({}) => {

  return (
    <div className="teamContainer">
      <div className='teamHeader'>
        <span style={{color: '#339966'}}>Войсеры, </span>
        <span style={{color: '#800000'}}>Технари, </span>
        <span style={{color: '#ebd800'}}>Переводчики, </span>
        <span style={{color: '#ff6600'}}>Оформители, </span>
        <span style={{color: '#b523c5'}}>Релизёры, </span>
        <span style={{color: '#000080'}}>Сидеры, </span>
        <span style={{color: '#33cccc'}}>Дизайнеры</span>
      </div>
      {Leagues.map(league => {
        return (
          <div className='leagueContainer' key={league.head.left}>
            <div className='leagueHeader'>
              <p className='headerLeft'>{league.head.left}</p>
              {league.head.right === 'ПОДАТЬ ЗАЯВКУ'
                ? <a href='https://t.me/joinlibria_bot' className='headerRight'>{league.head.right}</a>
                : <p className='headerRight'>{league.head.right}</p>
              }
            </div>
            <ul className='leagueBody'>
              {league.list.map(member => {
                return (
                  <div className='memberContainer' key={member.name}>
                    <li className={`memberName ${member.color}`}>
                      {member.name}
                    </li>
                    <span className='memberRole'>
                      {`\u00A0- ${member.role}`}
                    </span>
                  </div>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  );
}

export default Team;
