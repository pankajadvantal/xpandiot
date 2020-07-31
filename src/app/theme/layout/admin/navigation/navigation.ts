import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'panel',
    title: 'Admin Panel',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home',
        for: [0, 1, 2]
      },
      {
        id: 'resource-tracking',
        title: 'Resource tracking',
        type: 'item',
        url: '/resource-tracking',
        classes: 'nav-item',
        icon: 'feather icon-map-pin',
        for: [0, 1, 2]
      },
      {
        id: 'inventory',
        title: 'Inventory',
        type: 'item',
        url: '/inventory',
        classes: 'nav-item',
        icon: 'feather icon-file-text',
        for: [0, 1, 2]
      },
      {
        id: 'alert',
        title: 'Alert',
        type: 'item',
        url: '/alert',
        classes: 'nav-item',
        icon: 'feather icon-bell',
        for: [0, 1, 2]
      },
      {
        id: 'user-management',
        title: 'Users Management',
        type: 'item',
        url: '/user-management',
        classes: 'nav-item',
        icon: 'feather icon-users',
        for: [1, 2]
      },
      {
        id: 'admin-management',
        title: 'Admin Management',
        type: 'item',
        url: '/admin-management',
        classes: 'nav-item',
        icon: 'feather icon-user',
        for: [2]
      },
      {
        id: 'org-management',
        title: 'Org Management',
        type: 'item',
        url: '/org-management',
        classes: 'nav-item',
        icon: 'fa fa-building',
        for: [2]
      },
   /*   {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'menu-level',
        title: 'Menu Levels',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Menu Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }
        ]
      } */
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
