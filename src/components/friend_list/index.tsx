import React, { useContext, useEffect, useState } from 'react';
import ListWithTag from 'base/list_with_tag';
import { Context as FriendListContext } from 'store/friend';
import SingleContact from 'base/single_contact';
import { Context as ContactCardContext } from 'store/contact_card';
import { changeContactCard } from 'store/contact_card/action';

export interface FriendListProps {
  keyword?: string;
}

function FriendList(props: FriendListProps) {

  const { state } = useContext(FriendListContext);
  const { dispatch: dispatchChangeContactCard } = useContext(ContactCardContext);
  const keyword = props.keyword;

  function clickAction(contactId: string) {
    let contact = state.find(item => {
      return String(item.id) === contactId;
    })
    console.log(contactId, contact);
    contact && dispatchChangeContactCard(changeContactCard(contact));
  }

  const friendList = keyword ? state.filter(item => {
    return item.name.includes(keyword);
  }).map(item => {
    return ({ id: item.id, name: item.name, ele: <SingleContact avatar = { item.avatar } name = { item.name } id = { item.id } type={ 'private' }></SingleContact> })
  }) : state.map(item => {
    return ({ id: item.id, name: item.name, ele: <SingleContact avatar = { item.avatar } name = { item.name } id = { item.id } type={ 'private' }></SingleContact> })
  })

  return (
    <div className='friend-list'>
      <ListWithTag tagName='联系人' list={friendList} clustering={true} clickAction={clickAction}></ListWithTag>
    </div>
  )
}

export default FriendList;