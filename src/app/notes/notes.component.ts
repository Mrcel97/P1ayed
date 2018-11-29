import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { PagesService } from '../services/pages.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  patchesObservable: Observable<any[]>;
  patchesObservableDesc: Observable<any[]>;
  reverse: any[] = [];

  constructor(private db: AngularFireDatabase, public pages: PagesService) { } // Injecting AngularFireDatabase to use it.

  ngOnInit() {
    this.pages.setPage('notes');
    // Add an observable to our pages section of FirebaseDatabase to know when a change is detected on it.
    this.patchesObservable = this.getPages('/patches');
    this.patchesObservable.subscribe( value => {
      for (let index = 0; index < value.length; index++) {
        this.reverse[index] = value[(value.length - 1) - index];
      }
      this.patchesObservableDesc = of(this.reverse);
      this.patchesObservableDesc.subscribe(vl => console.log(vl));
    });
  }

  getPages(listPath): Observable<any[]> {
    var patches = this.db.list(listPath).valueChanges(); // Return from our db a list from specific url
    return patches;
  }

}
