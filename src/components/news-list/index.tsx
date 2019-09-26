import React, { useContext } from 'react';

import './index.scss';

import SingleNews, {NewsProps} from 'base/single_news';

import { Context as NewsListContext } from 'store/news_list';

export interface NewsListProps {
  newsList: NewsProps[];
}

function NewsList(props: object) {

  const { state: newsListState } = useContext(NewsListContext);
  console.log(newsListState);
  return(
    <ul className='news-list'>
      {
        newsListState.map(news => {
          return <li className='single-news-wrapper' key={news.id}><SingleNews {...news}/></li>
        })
      }
    </ul>
  )
}

export default NewsList;