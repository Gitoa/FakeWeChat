import React from 'react';
import FriendList from 'components/friend_list';
import GroupList from 'components/group_list';
import RecordList from 'components/record_list';
import './index.scss';

interface ContactProps {
  keyword?: string;
}

function Contact(props: ContactProps) {

  return (
    <div className='contact'>
      <div className='record-list-wrapper'>
        <RecordList></RecordList>
      </div>
      <div className='friend-list-wrapper'>
        <FriendList keyword={props.keyword}></FriendList>
      </div>
      <div className='group-list-wrapper'>
        <GroupList keyword={props.keyword}></GroupList>
      </div>  
    </div>
  )
}

export default Contact;