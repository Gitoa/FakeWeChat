import Admin from './admin';
import NewsList from './news_list';
import FriendList from './friend';
import GroupList from './group';
import Record from './record';
import ContactCard from './contact_card';

export default [ Admin.Provider,NewsList.Provider, FriendList.Provider, GroupList.Provider, Record.Provider, ContactCard.Provider ];