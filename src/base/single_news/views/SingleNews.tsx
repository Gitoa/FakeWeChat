import React from 'react';
import {SingleMessageProps} from 'base/single_message';

export interface SingleNewsProps {
  type: 'group' | 'private';
  id: string;
  avatar?: string;
  lastMsg: SingleMessageProps;
}

function SingleNews(props: SingleNewsProps): React.ReactNode {
  return
}

export default SingleNews;