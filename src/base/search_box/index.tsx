import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context as FriendContext } from 'store/friend';
import { Context as NewsListContext } from 'store/news_list';
import { Context as GroupListContext } from 'store/group';

import './index.scss';

export interface SearchBoxProps {
  online?: boolean;
  inputStyle?: object;
  changeKeyword: (keyword: string) => void;
}

function SearchBox(props: SearchBoxProps) {

  const searchEl = useRef<HTMLInputElement>(null);

  function changeKeyword() {
    //utils.debounce
    let keyword = (searchEl.current as HTMLInputElement).value;
    console.log((searchEl.current as HTMLInputElement).value);
    props.changeKeyword(keyword);
  }

  return (
    <div className='search-box'>
      <div className='iconfont search-button'>
        <i className='icon-search'></i>
      </div>
      <input type='text' placeholder='搜索' onChange={changeKeyword} ref={searchEl} style={props.inputStyle}></input>
    </div>
  )
}

export default SearchBox;