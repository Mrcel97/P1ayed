import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user';

import * as firebase from 'firebase/app';
import { Game, Company, Logo, Pegi } from './game';

@Injectable({
  providedIn: 'root'
})
export class AfService {
  user$: Observable<User>;
  private uid;

  constructor( public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.user$ = afAuth.authState.pipe(switchMap( user => { 
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    } ));
  }

  createAccountWithEmail(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.error('Login Service with email temporarily unavailable');
    });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( (credential) => {
      this.updateUser(credential.user);
    });
  }

  loginWithEmail(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(
      function(error) {
        console.error('Login Service with email temporarily unavailable');
      }
    )
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }

  updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc<User>(`users/${user.uid}`);
    var logTime: number;

    logTime = this.getTime();
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true,
        developer: false,
        admin: false
      },
      since: logTime
    }
    return userRef.set(Object.assign({}, data));
  }

  getTime(): number {
    return new Date().getTime();
  }

  haveUser(): boolean {
    return firebase.auth().currentUser != null
  }

  addGame(game: Game) {
    var jsonGame = JSON.stringify(game);

    /** How to add TypeScript Obj to Firestore Array.
     *    * 1st way: Adding to new collection inside document.
     *      gameWebsite > users(Col) > user(Doc) > fabGames(Col).add
     * 
     *    + Pros:
     *      · Only requires 1 operation (ADD).
     */
    this.afs.collection('users')
      .doc(this.uid)
      .collection('games')
      .add( JSON.parse(JSON.stringify(game)) )
      
    /** How to add TypeScript Obj to Firestore Array.
     *    * 2nd way: Setting/Updatting Array Document Field from document.
     *      gameWebsite > users(Coll) > user(Doc) > mygames[](Field).set/.update
     * 
     *    - Cons:
     *      · Requires to: GET the array + (Local)Update the array + (Cloud)Update the array.
     *  
     *  this.afs.collection('users')
     *   .doc(this.uid)
     *   .set(
     *     { myGames: [ JSON.parse(JSON.stringify(game)) ] },
     *     { merge: true}
     *   )
     * 
     */
  }

  getGames() {
    var userGames;
    var gamesCollection = this.afs.collection('users').doc(this.uid).collection('games').ref;
    var allGames = gamesCollection.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var game = doc.data();
        });
      })
      .catch(err => {
        console.error('Error getting documents', err)
      });
  }

}
