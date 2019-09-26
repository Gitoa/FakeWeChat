export interface NavBarItem {
  type: string;
  icon: string;
  path: string;
}

const NavBarData: NavBarItem[] = [
  {
    type: 'news',
    icon: 'icon-comment',
    path: '/news',
  },
  {
    type: 'contacts',
    icon: 'icon-user',
    path: '/contact',
  },
  {
    type: 'recommend',
    icon: 'icon-eye',
    path: '/recommend',
  },
]

export {NavBarData}