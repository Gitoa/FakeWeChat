import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { Context as MiniCardContext } from 'store/mini_card';
import { changeMiniCard } from 'store/mini_card/action';
import SingleContact, { SingleContactProps } from 'base/single_contact';
import SearchBox from 'base/search_box';
import { getMockGroupMembers } from 'common/js/cache';
import { User } from 'common/js/interfaces';

export interface ChatInformationProps{
  type: 'group' | 'private' | 'stranger';
  id: string;
  target?: SingleContactProps;
  name: string;
  notice?: string;
  avatar?: string;
  wechatId?: string;
}

function ChatInformation(props: ChatInformationProps) {

  const [members, setMembers] = useState<SingleContactProps[]>([]);

  const {dispatch} = useContext(MiniCardContext);

  function changeCard(e: any) {
    let el = (e.target as HTMLElement);
    console.log('changeminicard: ', el);
    let currentTarget = e.currentTarget;
    while(el !== currentTarget) {
      if (el.classList.contains('single-contact-wrapper')) {
        break;
      }
      el = (el.parentNode as HTMLElement);
    }
    console.log(el);
    if (el.classList.contains('single-contact-wrapper')) {
      let id = el.dataset.id;
      console.log(id, typeof id, members, typeof members[0].id);
      let contact = members.find(item => item.id+'' === id+'');
      console.log(contact);
      contact && dispatch(changeMiniCard(contact))
    }
  }

  useEffect(() => {
    if (props.type === 'group') {
      fetch('/group_member/' + props.id).then(response => {
        if (response.status === 304 || response.ok) {
          return response.json();
        }
        throw new Error('response not ok');
      }).then(data => {
        console.log(data);
        data = (data as User[]).map(item => ({...item, type: 'private'}));
        setMembers(data);
      }).catch(err => {
        console.log(err);
      })
    } else {
      setMembers([{avatar: props.avatar, id: props.id, name: props.name, wechatId: props.wechatId ? props.wechatId : props.id, type: props.type}])
    }
  }, [props.type + props.id]);

  return (
    <div className='chat-information' onClick={(event) => {console.log('233');event.stopPropagation()}}>
      {
        props.type === 'group' ? (<div className='group-base-info'>
          <div className='group-name'>
            <p>{ '群名' }</p>
            <p>{ props.name }</p>
          </div>
          <div className='group-notice'>
            <p>{ '群公告' }</p>
            <p>{ props.notice ? props.notice : '暂无' }</p>
          </div>
        </div>) : ('')
      }
      <div className='content-wrapper'>
        {
          props.type === 'group' ? (<div className='group-search'><SearchBox changeKeyword={()=>{}} inputStyle={{backgroundColor: 'rgb(215, 215, 215)'}}></SearchBox></div>) : ''
        }
        <ul className='member-list' onClick={changeCard}>
          {
            members.map(item => {
              return <li className='single-contact-wrapper' key={item.id} data-id={item.id}><SingleContact {...item}></SingleContact></li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ChatInformation;