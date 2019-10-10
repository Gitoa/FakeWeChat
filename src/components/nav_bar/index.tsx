import React, { useContext, useReducer } from 'react';
import { NavBarItem } from 'common/js/config';
import { NavLink } from 'react-router-dom';
import { Context as AdminContext } from 'store/admin';
import './index.scss';

function NavBar(props: {navItem: NavBarItem[]}) {
  const { state: admin } = useContext(AdminContext);

  function logout() {
    console.log('logout');
    fetch("/logout?user_id=" + admin.id).then(response => {
      if (response.ok || response.status === 304) {
        return response.json()
      }
      throw new Error('Network reponse was not ok');
    }).then(ack => {
      window.location.href = "/signin";
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='nav-bar'>
      <div className='avatar-wrapper' style={{backgroundImage: admin.avatar?`url(http://localhost:3080${admin.avatar})`:'url(http://localhost:3080/static/img/default.jpg)'}}>
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
          <i className='icon-setting' onClick={logout}></i>
        </div>
      </div>
    </div>
  )
}

export default NavBar;