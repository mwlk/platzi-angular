import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showMenu: boolean = false;

  constructor() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
