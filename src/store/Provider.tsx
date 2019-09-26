import React, { ReactNode } from 'react';
import { ProviderProps } from 'common/js/interfaces';
import providers from './providers';

interface ProviderComposerProps extends ProviderProps {
  providers: Array<((props: ProviderProps) => JSX.Element)>;
}

const ProviderComposer = (props: ProviderComposerProps) => {
  return props.providers.reduceRight((children, Parent) => (
    <Parent>{children}</Parent>
  ), props.children)
}

const Provider = (props: ProviderProps) => {
  return (
    <ProviderComposer providers={providers}>
      {props.children}
    </ProviderComposer>
  )
}

export default Provider;