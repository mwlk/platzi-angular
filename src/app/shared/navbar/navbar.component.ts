import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu: boolean = false;
  counter: number = 0;

  constructor(private _storeSvc: StoreService) {}
  ngOnInit(): void {
    this._storeSvc.myCart$.subscribe((productList) => {
      this.counter = productList.length;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
