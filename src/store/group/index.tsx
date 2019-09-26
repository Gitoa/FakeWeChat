import React, { useReducer, useContext } from 'react';
import reducer, { initState } from './reducer';
import { Group, ProviderProps } from 'common/js/interfaces';
import Action from './action';

interface GroupContextProps {
  state: Group[];
  dispatch: React.Dispatch<Action>;
}

const Context = React.createContext<GroupContextProps>({ state: initState, dispatch: (value: any) => {} });

const Provider = (props: ProviderProps) => {
  const [ state, dispatch ] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export { Context, Provider };
export default { Context, Provider };