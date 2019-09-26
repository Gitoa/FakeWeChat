import React, { useContext, useReducer } from 'react';
import { NavBarItem } from 'common/js/config';
import { NavLink } from 'react-router-dom';
import { Context as AdminContext } from 'store/admin';
import './NavBar.scss';

function NavBar(props: {navItem: NavBarItem[]}) {
  const { state: admin } = useContext(AdminContext);
  return (
    <div className='nav-bar'>
      <div className='avatar-wrapper' style={{backgroundImage: admin.avatar?`url(${admin.avatar})`:''}}>
      </div>
      <div className='nav-wrapper'>
        {
          props.navItem.map(item => {
            return (
              <NavLink to={item.path} key={item.type} className='nav-button' activeClassName='nav-active'>
                <div className='iconfont'>
                  <i className={item.icon}/>
                </div>
              </NavLink>
            )
          })
        }
      </div>
      <div className='operation-wrapper'>
        <div className='iconfont'>
          <i className='icon-setting'></i>
        </div>
      </div>
    </div>
  )
}

export default NavBar;