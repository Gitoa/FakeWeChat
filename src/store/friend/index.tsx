import React, { useReducer } from 'react';
import reducer, { initState } from './reducer';
import { User, ProviderProps } from 'common/js/interfaces';
import { Action as FriendAction } from './action';

interface FriendContextProps {
  state: User[];
  dispatch: React.Dispatch<FriendAction>;
}

const Context = React.createContext<FriendContextProps>({ state: initState, dispatch: (value: any) => {} })

function Provider(props: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export { Context, Provider };
export default { Context, Provider };