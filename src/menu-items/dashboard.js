// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconUserCog } from '@tabler/icons-react';
import { IconBox } from '@tabler/icons-react';
import { IconShoppingCart } from '@tabler/icons-react';
import { IconReceipt2 } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  // title: 'Menus',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'promotions',
      title: 'Promotions',
      type: 'item',
      url: '/promotions',
      // icon: <span dangerouslySetInnerHTML={{ __html: '&#xeb4d;' }} />, // Use HTML entity

      icon: IconReceipt2,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: IconBox,
      breadcrumbs: false
    },
    {
      id: 'usersManagement',
      title: 'Users Management',
      type: 'item',
      url: '/usersManagement',
      icon: IconUserCog,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
