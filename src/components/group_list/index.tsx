import React, { useContext } from 'react';
import { Context as GroupListContext } from 'store/group';
import ListWithTag from 'base/list_with_tag';
import SingleContact from 'base/single_contact';
import { Context as ContactCardContext } from 'store/contact_card';
import { changeContactCard } from 'store/contact_card/action';

export interface GroupListProps {
  keyword?: string;
}

function GroupList(props: GroupListProps) {

  const { state } = useContext(GroupListContext);
  const { dispatch: dispatchChangeContactCard } = useContext(ContactCardContext)
  const keyword = props.keyword;

  function clickAction(contactId: string) {
    let contact = state.find(item => {
      return String(item.id) === contactId;
    })
    console.log(contactId, contact);
    contact && dispatchChangeContactCard(changeContactCard(contact));
  }

  const groupList = keyword ? state.filter(item => {
    return item.name.includes(keyword);
  }).map(item => {
    return ({id: item.id, name: item.name, ele: <SingleContact avatar={item.avatar} name={item.name} id={item.id} type={'group'}></SingleContact>})
  }) : state.map(item => {
    return ({id: item.id, name: item.name, ele: <SingleContact avatar={item.avatar} name={item.name} id={item.id} type={'group'}></SingleContact>})
  })
  return (
    <div className='group-list'>
      <ListWithTag tagName='群组' list={groupList} clustering={true} clickAction={clickAction}></ListWithTag>
    </div>
  )
}

export default GroupList;