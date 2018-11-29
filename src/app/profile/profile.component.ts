import { Component, OnInit } from '@angular/core';

import { PagesService } from '../services/pages.service';

import { AfService } from '../services/af.service';
import { User } from '../services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  actualClass: string = 'full-bg-img1';
  actualTab: string = 'summary';
  user: User;

  constructor(
    public page: PagesService,
    public afService: AfService
  ) {}

  ngOnInit() {
    var actualPage = this.page.getPage();
    var backgroundClasses = document.getElementById('background').classList

    this.updateBackground(backgroundClasses, actualPage);
    this.afService.user$.subscribe(value => {
      this.user = value;
    });
  }
  

  private updateBackground(backgroundClasses:DOMTokenList, actualPage: string) {
    if (actualPage == 'home' || actualPage == 'notes') {
      this.swapClasses(backgroundClasses, 'full-bg-img1');
    } else if (actualPage == 'search') {
      this.swapClasses(backgroundClasses, 'full-bg-img2');
    } else if (actualPage == 'categories') {
      this.swapClasses(backgroundClasses, 'full-bg-img3');
    } else if (actualPage == 'mylist') {
      this.swapClasses(backgroundClasses, 'full-bg-img4');
    }
  }

  private swapClasses(obj: DOMTokenList, newClass: string) {
    obj.remove(this.actualClass);
    obj.add(newClass);
  }

  select(tab: string) {
    this.actualTab = tab;
  }

}
