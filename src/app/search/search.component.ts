import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';

import { PagesService } from '../services/pages.service';
import { IgdbService } from '../services/igdb.service';

import { Game } from '../services/game';
import { Search } from '../services/search';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  term: string = '';
  games$: Observable<Game>;

  // Animation variables
  animated: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public page: PagesService,
    public igdbService: IgdbService
  ) {
      this.route.params.subscribe( param => { // Hear URL to detect changes.
        if (param['term']) {
          this.onSearch(param['term']);
        }
      });
    }

  ngOnInit() {
    this.page.setPage('search');
    this.igdbService.hasEnded().subscribe( val => {
      if (val == false) {
        this.animated = true;
        this.colorAnimation();
        this.spinAnimation();
      } else {
        this.animated = false;
      }
    })
  }

  doSearch() {
    if (this.term != '') {
      this.router.navigate(['search', {term: this.term}]) // Change URL.
    }
  }

  onSearch(term: string) {
    this.igdbService.searchGames(this.generateSearch(term));
  }

  generateSearch(term: string): Search { // TODO: Change name to generateDefaultSearch()
    return new Search(term, undefined, 'games', undefined, 'desc');
  }

  async colorAnimation() {
    var header = document.getElementById('games-header');
    var deg = 0;

    while (this.animated) {
      header.style["backgroundColor"] = "LightCoral";
      await this.sleep(1000);
      header.style["backgroundColor"] = "Gold";
      await this.sleep(1000);
      header.style["backgroundColor"] = "LightGreen";
      await this.sleep(1000);
      header.style["backgroundColor"] = "#4285F4";
    }

    header.style["backgroundColor"] = "#4285F4";
  }

  async spinAnimation() {
    var header = document.getElementById('games-header');
    var deg = 0;

    while (this.animated) {
      deg += 45;
      header.style["transform"] = `rotate(${deg}deg)`;
      await this.sleep(100);
    }

    header.style["transform"] = 'rotate(0deg)';
  }

  private sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

}
