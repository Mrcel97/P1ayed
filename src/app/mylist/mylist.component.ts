import { Component, OnInit } from '@angular/core';

import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  constructor(public page: PagesService) { }

  ngOnInit() {
    this.page.setPage('mylist');
  }

}
