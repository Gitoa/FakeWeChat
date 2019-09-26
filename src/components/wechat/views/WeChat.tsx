import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBarData } from 'common/js/config';
import NavBar from 'components/nav_bar';
import './WeChat.scss';

function WeChat () {
  return (
    <div className='wechat'>
      <Router>
        <div className='left-wrapper'>
          <NavBar navItem={NavBarData}></NavBar>
        </div>
        <div className='middle-wrapper'></div>
        <div className='right-wrapper'></div>
      </Router>
    </div>
  )
}

export default WeChat;