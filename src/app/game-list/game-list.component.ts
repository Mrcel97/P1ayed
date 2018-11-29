import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { trigger, keyframes, animate, transition } from '@angular/animations'
import * as kf from '../game-item/keyframes';

import { PagesService } from '../services/pages.service';
import { IgdbService } from '../services/igdb.service';
import { AfService } from '../services/af.service';

import { Search } from '../services/search';
import { Game } from '../services/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  constructor(public igdbService: IgdbService) { }

  ngOnInit() {
  }

}
