import React from 'react';
import FriendList from 'components/friend-list';
import GroupList from 'components/group-list';
import RecordList from 'components/record-list';
import './index.scss';

function Contact() {

  return (
    <div className='contact'>
      <div className='record-list-wrapper'>
        <RecordList></RecordList>
      </div>
      <div className='friend-list-wrapper'>
        <FriendList></FriendList>
      </div>
      <div className='group-list-wrapper'>
        <GroupList></GroupList>
      </div>  
    </div>
  )
}

export default Contact;