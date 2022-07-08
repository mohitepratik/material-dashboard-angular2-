import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Rejection Rate',  icon:'content_paste', class: '' },
    { path: '/notifications', title: 'Sand Testing Data',  icon:'location_on', class: '' },
    { path: '/table-list', title: 'Metal Pouring data',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Knock-out',  icon:'content_paste', class: '' },
    { path: '/icons', title: 'Fetling',  icon:'content_paste', class: '' },
    { path: '/maps', title: 'Painting',  icon:'bubble_chart', class: '' },
   
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
