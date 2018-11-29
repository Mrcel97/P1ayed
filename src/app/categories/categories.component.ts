import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(public page: PagesService) { }

  ngOnInit() {
    this.page.setPage('categories');
  }

}
