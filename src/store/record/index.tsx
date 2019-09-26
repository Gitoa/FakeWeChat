import React, { useReducer } from 'react';
import { ApplyRecord } from 'common/js/interfaces';
import reducer, { initState } from './reducer';
import { ProviderProps } from 'common/js/interfaces';
import Action from './action';

interface RecordContextProps {
  state: ApplyRecord[];
  dispatch: React.Dispatch<Action>;
}

const Context = React.createContext<RecordContextProps>({ state: initState, dispatch: (value: any) => {} });

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