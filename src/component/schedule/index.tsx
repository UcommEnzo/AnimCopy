import React, { useEffect } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSchedule } from '../../redux/reducers/ActionCreators';
import { TitleType } from '../../models/ITitlePayload';
import TitleCard from '../common/titleCard';


const Schedule = ({ }) => {

  const dispatch = useAppDispatch()
  const { fetchingGetSchedule, getScheduleError, scheduleData } = useAppSelector(state => state.AnimeReducer)
  const weekDays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ]
  const scheduleHeader = {
    asterisk: 'РАСПИСАНИЕ ВЫХОДА СЕРИЙ В ОЗВУЧКЕ АНИЛИБРИИ*',
    description: '*новые серии выходят в этот день недели +-1 день. ' +
      'В начале сезона расписание может не соответствовать действительности. ' +
      'Если серии задерживаются — это будет указано в статусе релиза (над постером).'
  }


  useEffect(() => {
    dispatch(getSchedule())
  }, [])


  return (
    <div className="scheduleContainer">
      <div className='scheduleHeader'>
        <p>
          {scheduleHeader.asterisk}
        </p>
        <p>
          {scheduleHeader.description}
        </p>
      </div>
      {weekDays.map((day, idx) => {
        return (
          <div className='dayContainer' key={day}>
            <div className='dayHeader'>{day.toUpperCase()}</div>
            <div className='dayBody'>
              {scheduleData && scheduleData[idx].list.map((title: TitleType) => {
                return <TitleCard title={title} key={title.id}/>
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Schedule;
