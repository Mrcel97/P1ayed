import { Component } from '@angular/core';

import { PagesService } from './services/pages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public pages: PagesService) { }

  ngOnInit() {
  }
}
