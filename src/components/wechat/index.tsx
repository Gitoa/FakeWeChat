import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavBarData } from 'common/js/config';
import NavBar from 'components/nav_bar';
import MiddleHeader from 'components/middle-header';
import NewsList from 'components/news-list';
import Contact from 'components/contact';
import Chat from 'components/chat';
import ContactCard from 'components/contact_card';
import { getLocalNews, getMockNewsList } from 'common/js/cache';

import './index.scss';

function WeChat () {
  return (
    <div className='wechat'>
      <Router>
        <div className='left-wrapper'>
          <NavBar navItem={NavBarData}/>
        </div>
        <div className='middle-wrapper'>
          <div className='header-wrapper'>
            <MiddleHeader></MiddleHeader>
          </div>
          <div className='content-wrapper'>
            <Route path='/news' component={ NewsList }></Route>
            <Route path='/contact' component={ Contact }></Route>
          </div>
        </div>
        <div className='right-wrapper'>
          <ContactCard></ContactCard>
        </div>
      </Router>
    </div>
  )
}

export default WeChat;