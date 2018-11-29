import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  actualTab: string = 'home';

  constructor(public pages: PagesService) { }

  ngOnInit() {
    this.actualTab = this.pages.getPage();
  }

  getTab(tab: string) {
    this.pages.setPage(tab);
    this.actualTab = tab;
  }

  getTabLogin(tab: string) {
    this.pages.setPage(this.actualTab);
    this.actualTab = tab;
  }
}
