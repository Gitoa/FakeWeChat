import { Admin } from 'common/js/interfaces';

export const initState: Admin = {
  id: '-1',
  name: 'admin',
  avatar: '/static/img/default.jpg',
  type: 'private',
}

const reducer = (state: Admin, action: {type: string, admin: Admin}): Admin => {
  const { type, admin } = action;

  switch (type) {
    case 'ADD':
      return admin;
    default:
      return state;
  }
}

export default reducer;