import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Platzi';
  profile!: User;

  /**
   *
   */
  constructor(private _authSvc: AuthService, private _userSvc: UserService) {}
  ngOnInit(): void {
    this.login();
  }

  createUser() {
    this._userSvc.create({
      name: 'test',
      email: 'test@test.com',
      password: '123456 ',
    });
  }

  login() {
    this._authSvc
      .login('mirko.wlk@dicsys.com', '123456')
      .pipe(
        switchMap((token) => {
          console.log(token.access_token);
          return this._authSvc.profile(token.access_token);
        })
      )
      .subscribe((data) => {
        this.profile = data;
        console.log(this.profile);
      });
  }
}
