import React, { useReducer } from 'react';
import { ProviderProps } from 'common/js/interfaces';
import { Action } from './action';
import reducer, { initState } from './reducer';

const Context = React.createContext({state: initState, dispatch: (value:any) => {}})

function Provider(props: ProviderProps) {
  const [ state, dispatch ] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      { props.children }
    </Context.Provider>
  )
}

export { Context, Provider };
export default { Context, Provider};