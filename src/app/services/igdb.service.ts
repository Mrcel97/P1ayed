import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap, filter } from 'rxjs/operators';

import { Game, Pegi } from './game';
import { Search } from './search';

import { igdb_key } from "../../assets/api_keys"

@Injectable({
  providedIn: 'root'
})
export class IgdbService {
  private PROXY_PATH: string = 'https://cors-anywhere.herokuapp.com/';
  private API_PATH: string = 'https://api-endpoint.igdb.com/';
  private OPTIONS_PATH: string = '/games/?search=Halo&fields=name,publishers';

  private ended$: BehaviorSubject<boolean>;
  public query: string = "";
  public games: Game[];
  public selectedGame: Game;

  constructor(private http: HttpClient) {
    this.ended$ = new BehaviorSubject<boolean>(true);
  }

  getGame(id): Game {
    var result: Game = undefined;
    var gameId = +id;

    this.games.forEach(game => {
      if (gameId == game.id) {
        result = game;
      }
    });
    return result;
  }

  getSummary(game: Game) {
    return game.summary.split(' ').slice(0,20).join(' ') + '...';
  }

  public searchGames(settings: Search) {
    if (this.query == settings.term) { // Duplicates Checker
      return;
    }
    // RESET (new search)
    this.ended$.next(false);
    this.query = settings.term;
    this.games = [];
    var gamesObj = []

    // HTTP variables
    var requestOptions = this.headerFactory();
    var searchSettings = this.searchSettingsFactory(settings);

    this.http
        .get<Game[]>(`${this.PROXY_PATH + this.API_PATH + searchSettings}`, requestOptions)
        .subscribe( data => {
          gamesObj = data; 
          gamesObj.forEach(gameObj => {
            this.games.push(this.gameFactory(gameObj))
          });
          this.ended$.next(true);
        });
  }

  searchById(id: number) {
    this.ended$.next(false);
    var gamesObj = [];
    
    // HTTP variables
    var requestOptions = this.headerFactory();

    this.http
        .get<Game[]>(`${this.PROXY_PATH + this.API_PATH + '/games/' + id }`, requestOptions)
        .subscribe( data => {
          gamesObj = data; 
          gamesObj.forEach(gameObj => {
            this.selectedGame = this.gameFactory(gameObj);
          });
          this.ended$.next(true);
        });
  }

  private headerFactory() {
    const httpOptions = {
      headers: new HttpHeaders({
        "user-key": igdb_key,
        Accept: "application/json"
      })
    };

    return httpOptions;
  }

  private searchSettingsFactory(settings: Search): string {
    var startQuery: string = '?search='
    var fields: string;

    fields = this.loadFields(settings.fields);

    return settings.section + '/' 
            + startQuery + settings.term + '&'
            + fields + '&'
            + 'order=popularity:' + settings.order
  }

  private loadFields(fields: string[]): string {
    var filters: string = 'fields=';

    fields.forEach(field => {
      filters = filters + field + ','
    });

    return filters.slice(0, -1);
  }

  private gameFactory(item: Game): Game {
    item = this.checkUndefined(item);
    return new Game(item.id,
                    item.name,
                    item.summary,
                    item.cover,
                    item.rating,
                    item.popularity,
                    item.url,
                    item.tags,
                    item.publishers,
                    item.game_engines,
                    item.genres.slice(0,2),
                    item.first_release_date,
                    new Pegi(item.pegi.rating, item.pegi.synopsis)
                  );
  }

  private checkUndefined(item: Game): Game {
    item.id = this.checkNumber(item.id);
    item.name = this.checkString(item.name);
    item.summary = this.checkString(item.summary);
    item.cover = this.checkString(item.cover);
    item.rating = this.checkNumber(item.rating);
    item.popularity = this.checkNumber(item.popularity);
    item.url = this.checkString(item.url);
    item.tags = this.checkNumberArray(item.tags);
    item.publishers = this.checkNumberArray(item.publishers);
    item.game_engines = this.checkNumberArray(item.game_engines);
    item.genres = this.checkNumberArray(item.genres);
    item.first_release_date = this.checkNumber(item.first_release_date);
    item.pegi = this.checkPegi(item.pegi);
    return item;
  }

  checkNumber(num: number): any {
    return num == undefined ? -1 : Math.round(num * 100) / 100;
  }

  checkNumberArray(num: number[]): number[] {
      return num == undefined ? [] : num;
  }

  checkString(str) { //TODO: We need a check Cover!
      return str == undefined ? 'Not provided.' : str;
  }

  checkPegi(obj: Pegi): Pegi {
      return obj == undefined ? new Pegi(-1,'') : obj;
  }

  hasEnded(): Observable<boolean> {
    return this.ended$.asObservable();
  }

}

