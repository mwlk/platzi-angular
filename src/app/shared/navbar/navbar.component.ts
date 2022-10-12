import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu: boolean = false;
  counter: number = 0;
  token = '';
  profile: User | null = null;

  constructor(private _storeSvc: StoreService, private _authSvc: AuthService) {}

  ngOnInit(): void {
    this._storeSvc.myCart$.subscribe((productList) => {
      this.counter = productList.length;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  login() {
    this._authSvc
      .loginAndGet('mirko.wlk@dicsys.com', '123456')
      .subscribe((res) => {
        this.profile = res;
        this.token = 'token';
      });
  }
}
