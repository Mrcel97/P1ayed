import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { trigger, keyframes, animate, transition } from '@angular/animations'
import * as kf from './keyframes';

import { PagesService } from '../services/pages.service';
import { IgdbService } from '../services/igdb.service';
import { AfService } from '../services/af.service';

import { Search } from '../services/search';
import { Game } from '../services/game';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
  animations: [ 
    trigger('cardAnimator', [
      transition('* => swipeR', animate(1000, keyframes(kf.swingRight))),
      transition('* => swipeL', animate(1000, keyframes(kf.swingLeft))),
    ])
   ]
})
export class GameItemComponent implements OnInit {

  @Input() game: Game;

  info: boolean = false;
  animationState: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public db: AfService,
    public page: PagesService,
    public igdbService: IgdbService) { }

  
  ngOnInit() {
  }

  search(term: string) { // TODO: change name to searchLikeThisDef() (of Default)
    this.igdbService.searchGames(new Search(term, undefined, 'games', undefined, 'desc'));
  }

  addGame(game: Game) { 
    this.db.addGame(game);
  }

  getGames() { 
    this.db.getGames();
  }
  
  getSummary(game: Game) {
    return this.igdbService.getSummary(game);
  }

  redirect(game: Game) {
    window.location.href = `${game.url}`
  }

  navigation(game: any) {
    window.location.href = `${game.url}`
  }

  startAnimation(state: string, game: Game) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState() {
    this.animationState = '';
  }

  moreInfo(game: Game) {
    this.igdbService.selectedGame = game;
    this.router.navigate(['game', `${game.id}`]);
  }

  detail(game: Game) {
    if (window.screen.width <= 767) {
      this.igdbService.selectedGame = game;
      this.router.navigate(['game', `${game.id}`]);
    }
  }

}
