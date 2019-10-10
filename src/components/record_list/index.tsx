import React, { useContext, useEffect, useState } from 'react';
import ListWithTag from 'base/list_with_tag';
import { Context as RecordListContext } from 'store/record';
import SingleRecord from 'base/single_record';
import { Context as ContactCardContext } from 'store/contact_card';
import { changeContactCard } from 'store/contact_card/action';
import './index.scss';

export interface RecordListProps {

}

function RecordList(props: RecordListProps) {

  const { state } = useContext(RecordListContext);

  const { dispatch: dispatchChangeContactCard } = useContext(ContactCardContext)

  function clickAction(contactId: string) {
    let contact = state.find(item => {
      return String(item.id) === contactId;
    })
    console.log(contactId, contact);
    contact && dispatchChangeContactCard(changeContactCard(contact));
  }

  const recordList = state.map(item => {
    return ({id: item.id, ele: <SingleRecord {...item}/>})
  })

  return (
    <div className='record-list'>
      <ListWithTag tagName='新的朋友' list={recordList} clickAction={clickAction} liStyle={{paddingTop:'15px', paddingBottom: '15px'}} showBorder={true}></ListWithTag>
    </div>
  )
}

export default RecordList;