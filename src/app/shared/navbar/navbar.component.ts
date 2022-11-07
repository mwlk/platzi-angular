import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';
import { Category } from '../models/category';
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
  categories: Category[] = [];
  constructor(private _storeSvc: StoreService, private _authSvc: AuthService, private _categorySvc: CategoryService) {}

  ngOnInit(): void {
    this._storeSvc.myCart$.subscribe((productList) => {
      this.counter = productList.length;
    });
    this.getAllCategories()
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

  getAllCategories() {
    this._categorySvc.getAll()
    .subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }
}
