import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  actualTab: string;

  constructor() { }

  setPage(tab: string): void {
    this.actualTab = tab;
  }

  getPage(): string {
    return this.actualTab;
  }
}
