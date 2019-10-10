import React, { useState, useEffect, useContext } from 'react';

import SearchBox from 'base/search_box';

import './index.scss';
import SingleContact, { SingleContactProps } from 'base/single_contact';
import { Context as MiniCardContext } from 'store/mini_card';
import { changeMiniCard } from 'store/mini_card/action';

interface SingleUserContact extends SingleContactProps {
  type: 'private';
}

interface SingleGroupContact extends SingleContactProps {
  creator: string;
  type: 'group';
}

function OnlineSearchBox() {
  
  const [keyword, setKeyword] = useState();
  const [userListResult, setUserListResult] = useState<SingleUserContact[]>([]);
  const [groupListResult, setGroupListResult] = useState<SingleGroupContact[]>([]);
  const {dispatch: dispatchMiniCard} = useContext(MiniCardContext);

  useEffect(() => {
    if(!keyword) {
      setUserListResult([]);
      setGroupListResult([]);
    } else {
      fetch('/search?keyword=' + keyword).then(response => {
        if (response.ok || response.status === 304) {
          return response.json();
        }
        throw new Error('response not ok');
      }).then(data => {
        setUserListResult(data.userOfKeyword);
        setGroupListResult(data.groupOfKeyword);
      })
    }
  }, [keyword])

  function clickUserResult(e: any) {
    let el = (e.target as HTMLElement);
    let currentTarget = e.currentTarget;
    while(el !== currentTarget) {
      if (el.classList.contains('single-contact-wrapper')) {
        break;
      }
      el = (el.parentNode as HTMLElement);
    }
    if (el.classList.contains('single-contact-wrapper')) {
      let id = el.dataset.id;
      let user = userListResult.find(item => String(item.id) === id)
      console.log(typeof id, typeof userListResult[0].id, user);
      user && dispatchMiniCard(changeMiniCard({...user, type: 'private'}));
    }
  }

  function clickGroupResult(e: any) {
    let el = (e.target as HTMLElement);
    let currentTarget = e.currentTarget;
    while(el !== currentTarget) {
      if (el.classList.contains('single-contact-wrapper')) {
        break;
      }
      el = (el.parentNode as HTMLElement);
    }
    if (el.classList.contains('single-contact-wrapper')) {
      let id = el.dataset.id;
      let group = groupListResult.find(item => String(item.id) === id)
      group && dispatchMiniCard(changeMiniCard({...group, type: 'group'}));
    }
  }

  return (
    <div className='online-search-box'>
      <div className='search-box-wrapper'>
        <SearchBox changeKeyword={setKeyword}></SearchBox>
      </div>
      <p>{'在线搜索结果'}</p>
      <div className='online-search-result'>
        {'用户'}
        <ul className='user-result' onClick={clickUserResult}>
          {
            userListResult && userListResult.length > 0 ? userListResult.map(user => {
              return <li className='single-contact-wrapper' data-id={user.id} key={user.id}><SingleContact {...user}></SingleContact></li>
            }) : <p>暂无结果</p>
          }
        </ul>
        {'群组'}
        <ul className='group-result' onClick={clickGroupResult}>
          {
            groupListResult && groupListResult.length > 0 ? groupListResult.map(group => {
              return <li className='single-contact-wrapper' data-id={group.id} key={group.id}><SingleContact {...group}></SingleContact></li>
            }) : <p>暂无结果</p>
          }
        </ul>
      </div>
    </div>
  )
}

export default OnlineSearchBox;