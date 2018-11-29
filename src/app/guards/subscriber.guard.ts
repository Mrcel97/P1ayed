import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { AfService } from '../services/af.service';


@Injectable({
  providedIn: 'root'
})
export class SubscriberGuard implements CanActivate {

  constructor(
    private router: Router,
    private afService: AfService,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.afService.user$.pipe(
        take(1),
        map( user => user && user.roles.subscriber ? true : false ),
        tap( isAdmin => {
          if (!isAdmin) {
            console.error("Access denied - Logged users only allowed");
            this.router.navigate(['homepage']);
          }
        } )
      );
  }
}
