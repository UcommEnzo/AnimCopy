import React, { useEffect } from 'react';
import Title from '../common/title';
import './index.scss';

const Random = () => {
  console.log('RENDER_Random')
  return (
    <div className="randomContainer">
      <Title random/>
    </div>
  );
}

export default Random;
