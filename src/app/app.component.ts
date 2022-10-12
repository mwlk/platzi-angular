import { Component } from '@angular/core';
import { FileService } from './services/file.service';
import { UserService } from './services/user.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Platzi';
  profile!: User;
  imgRta = '';

  /**
   *
   */
  constructor(private _userSvc: UserService, private _fileSvc: FileService) {}
  // ngOnInit(): void {
  //   this.login();
  // }

  createUser() {
    this._userSvc.create({
      name: 'test',
      email: 'test@test.com',
      password: '123456 ',
    });
  }

  // login() {
  //   this._authSvc
  //     .login('mirko.wlk@dicsys.com', '123456')
  //     .pipe(
  //       switchMap((token) => {
  //         console.log(token.access_token);
  //         return this._authSvc.profile(token.access_token);
  //       })
  //     )
  //     .subscribe((data) => {
  //       this.profile = data;
  //       console.log(this.profile);
  //     });

  downloadDoc() {
    this._fileSvc
      .getFile(
        'test',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  uploadDoc(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this._fileSvc.uploadFile(file).subscribe((res) => {
        this.imgRta = res.location;
      });
    }
  }
}
