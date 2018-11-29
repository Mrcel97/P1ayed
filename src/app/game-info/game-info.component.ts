import { Component, OnInit } from '@angular/core';
import { Game } from '../services/game';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IgdbService } from '../services/igdb.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  INVALID_DATA:number = -1;
  game_id: number;
  game: Game;
  rating: boolean[] = [false, false, false, false, false];
  popularity: boolean[] = [false, false, false, false, false];
  haveRating: boolean = false;
  havePopularity: boolean = false;

  // Animation variables
  animated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private gameService: IgdbService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.game_id = params['id'];
    });

    if (this.gameService.games != undefined) {
      this.game = this.gameService.getGame(this.game_id);
      this.updateRating();
      this.updatePopularity();  
      return;
    }

    this.gameService.searchById(+this.game_id);
    this.gameService.hasEnded().subscribe( val => {
      if (val == true) {
        this.game = this.gameService.selectedGame;
        this.updateRating();
        this.updatePopularity();
        this.animated = false;
      } else {
        this.animated = true;
        this.colorAnimation();
        this.spinAnimation();
      }
    })
  }

  goBack() {
    this._location.back();
  }

  private updateRating() { // Max: 100
    if (this.game.rating != this.INVALID_DATA) { //TODO: invalid_rating
      this.haveRating = true;
      this.game.rating = Math.trunc(this.game.rating/10);
      this.setRating();
    }
  }

  private updatePopularity() { // Max: 100
    if (this.game.popularity != this.INVALID_DATA) {
      this.havePopularity = true;
      this.game.popularity = Math.trunc(this.game.popularity/10)
      this.setPopularity()
    }
  }

  private setRating() {
    var loop = 0;
    for (let index = 2; index <= this.game.rating; index+=2) {
      if (this.game.rating >= index) {
        this.rating[loop] = true;
      }
      loop++;
    }
  }

  private setPopularity() {
    var loop = 0;
    for (let index = 2; index <= this.game.popularity; index+=2) {
      if (this.game.popularity >= index) {
        this.popularity[loop] = true;
      }
      loop++;
    }
  }

  private state(): boolean {
    return true;
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
    var quartDegrees = 45;
    var deg = 0;

    while (this.animated) {
      deg += quartDegrees;
      header.style["transform"] = `rotate(${deg}deg)`;
      await this.sleep(100);
    }

    header.style["transform"] = 'rotate(0deg)';
  }

  private sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

}
