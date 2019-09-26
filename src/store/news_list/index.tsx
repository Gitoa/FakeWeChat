import React, { useReducer } from 'react';
import { ProviderProps } from 'common/js/interfaces';
import { NewsProps } from 'base/single_news';
import { Action as NewsListAction } from './action';
import reducer, { initState } from './reducer';

interface NewsListContextProps {
  state: NewsProps[];
  dispatch: React.Dispatch<NewsListAction>;
}

const Context = React.createContext<NewsListContextProps>({ state: initState, dispatch: (value: any) => {} });

const Provider = (props: ProviderProps) => {
  
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}
export { Context, Provider };
export default { Context, Provider};