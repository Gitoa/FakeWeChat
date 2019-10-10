import React, { useReducer } from 'react';
import { SingleMessageProps } from 'base/single_message';
import { ProviderProps } from 'common/js/interfaces';
import reducer, { initState } from './reducer';

export interface MessageState {
  [chatIndex: string]: SingleMessageProps[];
}

const Context = React.createContext({state: initState, dispatch: (value: any) => {}})

function Provider(props: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{state, dispatch}}>
      { props.children }
    </Context.Provider>
  )
}

export { Provider, Context };

export default { Context, Provider };