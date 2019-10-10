import React, { useReducer } from 'react';
import reducer, { initState } from './reducer';
import { ProviderProps } from 'common/js/interfaces';

const Context = React.createContext({state: initState, dispatch: (value: any) => {}});

function Provider(props: ProviderProps) {
  const [ state, dispatch ] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{state, dispatch}}>
      { props.children }
    </Context.Provider>
  )
}

export { Provider, Context };

export default { Context, Provider };