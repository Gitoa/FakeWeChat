import React, { Component } from 'react';
import './index.scss';

export interface MaskProps {
  cb?: () => void;
  maskStyle?: object;
}

const Mask = function(props: MaskProps) {
  return (
    <div className='mask' onClick={props.cb} style={props.maskStyle}></div>
  )
}

export default Mask;