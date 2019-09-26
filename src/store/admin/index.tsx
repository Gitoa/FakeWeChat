import React, { useReducer, ReactNode } from 'react';

import reducer, { initState } from './reducer';
import { Admin, ProviderProps } from 'common/js/interfaces';

interface AdminContextProps {
  state: Admin;
  dispatch: React.Dispatch<{type: string, admin: Admin}>
}

const Context = React.createContext<AdminContextProps>({ state: initState, dispatch: (value: any) => {} });

const Provider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

Provider.propTypes = {

}
export { Context, Provider }
export default { Context, Provider };