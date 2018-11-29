// Modules
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { NotesComponent } from './notes/notes.component';
import { GameListComponent } from './game-list/game-list.component';
import { MylistComponent } from './mylist/mylist.component';
import { ProfileComponent } from './profile/profile.component';
import { SummaryComponent } from './profile/summary/summary.component';
import { RolesComponent } from './profile/roles/roles.component';
import { CommentsComponent } from './profile/comments/comments.component';

// Guards
import { SubscriberGuard } from './guards/subscriber.guard';

// Environments, Services, Configurations and more
import { environment } from '../environments/environment';
import { MyHammerConfig } from './configs/hammerjs-conf';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameItemComponent } from './game-item/game-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppNavbarComponent,
    SearchComponent,
    LoginComponent,
    CategoriesComponent,
    FooterComponent,
    NotesComponent,
    GameListComponent,
    MylistComponent,
    ProfileComponent,
    SummaryComponent,
    RolesComponent,
    CommentsComponent,
    GameInfoComponent,
    GameItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ 
    SubscriberGuard,
    {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
