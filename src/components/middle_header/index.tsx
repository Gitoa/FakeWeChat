import React from 'react';

import SearchBox from 'base/search_box';

import { Route } from 'react-router-dom';

import './index.scss';
import { tsPropertySignature } from '@babel/types';

interface MiddleHeaderProps {
  changeKeyword: (keyword: string) => void;
  buttonCb?: () => void;
}

function MiddleHeader(props: MiddleHeaderProps) {
  return (
    <div className='middle-header'>
      <div className='search-box-wrapper'>
        <SearchBox changeKeyword={props.changeKeyword}></SearchBox>
      </div>
      <Route path='/news' render={()=>(<div className='add-button-wrapper' onClick={props.buttonCb}>{ '+' }</div>)}></Route>
    </div>
  )
}

export default MiddleHeader;