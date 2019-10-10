import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { NavBarData } from 'common/js/config';
import NavBar from 'components/nav_bar';
import MiddleHeader from 'components/middle_header';
import NewsList from 'components/news_list';
import Contact from 'components/contact';
import NewsChat from 'components/news_chat';
//import ContactCard from 'components/contact_card';
import { getLocalNews, getMockNewsList } from 'common/js/cache';
import MiniCard from 'base/mini_card';
//import OnlineSearchBox from 'base/online_search_box';
import { Context as MiniCardContext } from 'store/mini_card';
import { changeMiniCard } from 'store/mini_card/action';
import { initState as initMiniCard } from 'store/mini_card/reducer';

import './index.scss';

const StrangerChat = loadable(() => import('components/stranger_chat'));
const Mask = loadable(() => import('base/Mask'));
const OnlineSearchBox = loadable(() => import('base/online_search_box'));
const ContactCard = loadable(() => import('components/contact_card'));

function WeChat () {
  const [ keyword, setKeyword ] = useState('');
  const { state: miniCardState, dispatch } = useContext(MiniCardContext);
  const [ onlineSearch, setOnlineSearch ] = useState(false);

  return (
    <div className='wechat'>
      <Router>
        <div className='left-wrapper'>
          <NavBar navItem={NavBarData}/>
        </div>
        <div className='middle-wrapper'>
          <div className='header-wrapper'>
            <MiddleHeader changeKeyword={(keyword) => {setKeyword(keyword)}} buttonCb={() => {setOnlineSearch(!onlineSearch)}}></MiddleHeader>
          </div>
          <div className='content-wrapper'>
            <Route path='/news' render={() => <NewsList keyword={keyword}></NewsList>}></Route>
            <Route path='/contact' render={() => <Contact keyword={keyword}></Contact>}></Route>
          </div>
        </div>
        <div className='right-wrapper'>
          <Route path='/news' component={ NewsChat }></Route>
          <Route path='/contact' component={ ContactCard }></Route>
          <Route path='/recommend' component={ StrangerChat }></Route>
          <Redirect path='/' to={{pathname: '/news'}}></Redirect>
        </div>
      </Router>
      <div className={`mini-card-wrapper ${miniCardState && miniCardState.id !== '-1' ? 'show' : 'hide'}`}>
        <Mask maskStyle={{zIndex: 9999}} cb={() => {dispatch(changeMiniCard(initMiniCard))}}></Mask>
        <MiniCard { ...miniCardState } closeCb={() => {dispatch(changeMiniCard(initMiniCard)); setOnlineSearch(false)}}></MiniCard>
      </div>
      <div className={`online-search-box-wrapper ${onlineSearch ? 'show' : 'hide'}`}>
        <Mask cb={() => {setOnlineSearch(false)}}></Mask>
        <OnlineSearchBox></OnlineSearchBox>
      </div>
    </div>
  )
}

export default WeChat;