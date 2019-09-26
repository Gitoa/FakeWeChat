import React from 'react';

import SearchBox from 'base/search_box';

import './index.scss';

function MiddleHeader() {
  return (
    <div className='middle-header'>
      <div className='search-box-wrapper'>
        <SearchBox></SearchBox>
      </div>
      <div className='add-button-wrapper'>
        { '+' }
      </div>
    </div>
  )
}

export default MiddleHeader;