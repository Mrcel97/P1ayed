import { Component, OnInit } from '@angular/core';

import { PagesService } from '../services/pages.service';
import { AfService } from '../services/af.service';

import { User } from '../services/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  actualPage: string = 'home';
  user: User;

  constructor(
    public pages: PagesService,
    public afService: AfService,
  ) { }

  ngOnInit() {
    this.pages.setPage('home');
    this.actualPage = this.pages.getPage();
    this.afService.user$.subscribe( value => {
      this.user = value;
    })
  }

  getTab(): string {
    return this.pages.getPage();
  }

}
