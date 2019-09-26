import React from 'react';

import './index.scss';

export interface SearchBoxProps {

}

function SearchBox(props: SearchBoxProps) {
  return (
    <div className='search-box'>
      <div className='iconfont search-button'>
        <i className='icon-search'></i>
      </div>
      <input type='text' placeholder='搜索'></input>
    </div>
  )
}

export default SearchBox;