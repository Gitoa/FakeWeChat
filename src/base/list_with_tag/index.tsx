import React, { useState } from 'react';
import SingleContact from 'base/single_contact';
import pinyin from 'pinyin';
import './index.scss';
import { string } from 'prop-types';
import { AnySoaRecord } from 'dns';

interface listItem {
    id: string;
    name?: string;
    ele: JSX.Element;
}

export interface ListWithTagProps {
  tagName: string;
  list: listItem[],
  clustering?: true;
  clickAction: (value: any)=> void;
  liStyle?: {};
  showBorder?: boolean;
}

const letterPattern = new RegExp('[A-Za-z]');
const ChinesePattern = new RegExp('[\\u4E00-\\u9FFF]');

function ListWithTag(props: ListWithTagProps) {

  const [showList, setShowList] = useState(false);
  const list = props.list;

  const clusteringList = new Map<string, listItem[]>();

  const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
  const showBorder = props.showBorder;
  let liStyle = Object.assign({}, props.liStyle), liStyleNoTopBorder = Object.assign({}, props.liStyle);
  if (props.showBorder) {
    Object.assign(liStyle, {borderTop:'solid 1px rgb(220, 220, 220)'})
  }

  if (props.clustering) {
    list.forEach(item => {
      let name = item.name, firstLetter = (name as string)[0];
      if (letterPattern.test(firstLetter)) {
        firstLetter = firstLetter.toUpperCase();
      } else if (ChinesePattern.test(firstLetter)) {
        firstLetter = pinyin(firstLetter, {style: pinyin.STYLE_FIRST_LETTER})[0][0]
      } else {
        firstLetter = '#';
      }
      clusteringList.has(firstLetter) || clusteringList.set(firstLetter, []);
      let list = clusteringList.get(firstLetter);
      (list as listItem[]).push(item);
      clusteringList.set(firstLetter, (list as listItem[]));
    })
  }

  function showCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let el = (e.target as HTMLElement);
    let currentTarget = e.currentTarget;
    while(el !== currentTarget) {
      if (el.classList.contains('single-contact') || el.classList.contains('single-record')) {
        break;
      }
      el = (el.parentNode as HTMLElement);
    }
    if (el.classList.contains('single-contact') || el.classList.contains('single-record')) {
      let id = el.dataset.id;
      props.clickAction(id);
    }
  }

  return (
    <div className='list-with-tag' onClick={showCard}>
      <div className='arrow-tag iconfont' onClick={() => {setShowList(!showList)}}>
        <i className={ showList ? 'icon-down': 'icon-right'}></i>
      </div>
      <div className='list-wrapper'>
        <div className='tag' onClick={() => {setShowList(!showList)}}>
          {props.tagName}
        </div>
        <ul className={`list ${showList ? 'show' : 'hide'}`}>
          {
            !props.clustering ? (
              list.map((item, index) => (
                <li key={item.id} style={index > 0 ? liStyle : liStyleNoTopBorder}>{item.ele}</li>
              ))
            ) : (
              index.split('').map(letter => {
                if (clusteringList.has(letter)) {
                  return (
                    <li className='cluster-wrapper' key={letter}>
                      <p className='cluster-letter'>{letter}</p>
                      <ul>
                        {
                          (clusteringList.get(letter) as listItem[]).map((item) => {
                            return (
                              <li key={item.id} style={liStyle}>{item.ele}</li>
                            )
                          })
                        }
                      </ul>
                    </li>
                    
                  )
                }
              })
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default ListWithTag;