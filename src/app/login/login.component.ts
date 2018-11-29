import { Component, OnInit } from '@angular/core';
import { AfService } from '../services/af.service';
import { User } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  logged: boolean;

  constructor(public afService: AfService, private router: Router) { }

  ngOnInit() {
    this.afService.user$.subscribe( user => this.user = user );
  }

  login() {
    this.afService.loginWithGoogle();
  }

  private logout() {
    this.afService.logout();
  }

  getLogStatus(): boolean {
    return this.afService.haveUser();
  }

  newUserEmail() {
    console.log('Creating new Email user...');
    this.afService.createAccountWithEmail('example@jmail.com', '1234567890');
    this.afService.loginWithEmail('example@jmail.com', '1234567890');
    console.log('Account successfully created!');
  }

}
