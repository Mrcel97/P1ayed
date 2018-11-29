import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { AfService } from '../../services/af.service';

declare var $:any

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  user: User
  role: number = 25;

  constructor(
    public afService: AfService,
  ) {}

  ngOnInit() {
    this.afService.user$.subscribe(value => {
      this.user = value;
    });
  }

  getRole() {
    if (!this.isDev() && !this.isAdmin() && this.isSub()) {
      return '25%';
    } else if (!this.isAdmin() && this.isDev()) {
      return '75%';
    } else if (this.isAdmin()) {
      return '100%';
    }
    return '0%';
  }

  private isSub() {
    return !this.user.roles.admin && this.user.roles.subscriber;
  }

  private isDev() {
    return !this.user.roles.admin && this.user.roles.developer;
  }

  private isAdmin() {
    return this.user.roles.admin;
  }

}
