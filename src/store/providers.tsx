import Admin from './admin';
import NewsList from './news_list';
import FriendList from './friend';
import GroupList from './group';
import Record from './record';
import ContactCard from './contact_card';
import StrangerChat from './stranger_chat';
import NewsChat from './news_chat';
import Messages from './messages';
import MiniCard from './mini_card';
import UnreadMessage from './unread_messages';
import LastMessage from './last_message';

export default [ Admin.Provider, NewsList.Provider, FriendList.Provider, GroupList.Provider, Record.Provider, ContactCard.Provider, StrangerChat.Provider, NewsChat.Provider, Messages.Provider, MiniCard.Provider, UnreadMessage.Provider, LastMessage.Provider ];