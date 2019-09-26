import React, { useReducer } from 'react';
import reducer, { initState } from './reducer';
import { ProviderProps, User, Group, ApplyRecord } from 'common/js/interfaces';
import { Action } from './action';

interface ContactCardContextProps {
  state: User|Group|ApplyRecord;
  dispatch: React.Dispatch<Action>
}

const Context = React.createContext<ContactCardContextProps>({ state: initState, dispatch: (value: any) => {} });

function Provider(props: ProviderProps) {
  
  const [ state, dispatch ] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      { props.children }
    </Context.Provider>
  )
}

export { Context, Provider };
export default { Context, Provider };
