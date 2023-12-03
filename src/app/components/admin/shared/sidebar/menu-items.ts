import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Doanh thu',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/admin/tour',
    title: 'Tour',
    icon: 'bi bi-book',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/admin/manage/account',
    title: 'Tài khoản',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/admin/manage/booking',
    title: 'Booking',
    icon: 'bi bi-clipboard-check',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/admin/manage/post',
    title: 'Bài viết',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/admin/manage/discount',
    title: 'Mã giảm giá',
    icon: 'bi bi-badge-vo',
    class: '',
    extralink: false,
    submenu: [
    ],
  },
  {
    path: '/admin/component/pagination',
    title: 'Pagination',
    icon: 'bi bi-dice-1',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/admin/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: [],
  },
];
