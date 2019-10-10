import React, { useContext } from 'react';
import { changeNewsChat } from 'store/news_chat/action';
import './index.scss';
import SingleNews, {NewsProps} from 'base/single_news';
import { Context as NewsListContext } from 'store/news_list';
import { Context as NewsChatContext } from 'store/news_chat';
import { Context as UnreadMsgContext } from 'store/unread_messages';
import { Context as LastMsgContext } from 'store/last_message';
import { Context as MsgContext } from 'store/messages';
import { Context as AdminContext } from 'store/admin';
import { addMsgs } from 'store/messages/action';
import { clearUnreadMessage } from 'store/unread_messages/action';
import { addNews } from 'store/news_list/action';

export interface NewsListProps {
  keyword?: string;
}


function NewsList(props: NewsListProps) {

  const { state: adminState } = useContext(AdminContext);
  const { state: newsListState, dispatch: newsListDispatch } = useContext(NewsListContext);
  const { dispatch } = useContext(NewsChatContext);
  const { state: unreadMsgState, dispatch: unreadMsgDispatch } = useContext(UnreadMsgContext);
  const { state: lastMsgState } = useContext(LastMsgContext);
  const { dispatch: msgDispatch } = useContext(MsgContext);
  const newsList = props.keyword ? newsListState.filter(news => news.name.includes((props.keyword as string))) : newsListState;

  function clickAction(e: any) {
    let el = (e.target as HTMLElement);
    let currentTarget = e.currentTarget;
    while(el !== currentTarget) {
      if (el.classList.contains('single-news-wrapper')) {
        break;
      }
      el = (el.parentNode as HTMLElement);
    }
    console.log(el);
    if (el.classList.contains('single-news-wrapper')) {
      let chatId = el.dataset.chatid;
      let news = newsListState.find(item => {
        return String(item.type + item.id) === chatId;
      })
      if(news) {
        let chatId = news.type + news.id;
        if (unreadMsgState[chatId]) {
          console.log(unreadMsgState[chatId]);
          msgDispatch(addMsgs(adminState.id, chatId, unreadMsgState[chatId]));
          unreadMsgDispatch(clearUnreadMessage(chatId));
        } else {
          msgDispatch(addMsgs(adminState.id, chatId, []));
        }
        newsListDispatch(addNews(news));
        dispatch(changeNewsChat(news));
      }
    }
  }
  
  return(
    newsList.length > 0 ? 
    <ul className='news-list' onClick={clickAction}>
      {
        newsList.map(news => {
          let chatId = news.type + news.id;
          return <li className='single-news-wrapper' key={chatId} data-chatid={chatId}><SingleNews unreadMsgCount={unreadMsgState[chatId] ? unreadMsgState[chatId].length : 0} lastMsg={lastMsgState[chatId]} {...news}/></li>
        })
      }
    </ul>
    : <p className='empty-news-list'>暂无内容</p>
  )
}

export default NewsList;