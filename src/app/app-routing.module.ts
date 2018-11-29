// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomePageComponent } from './home-page/home-page.component';
import { NotesComponent } from './notes/notes.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { MylistComponent } from './mylist/mylist.component';
import { ProfileComponent } from './profile/profile.component';
import { GameInfoComponent } from './game-info/game-info.component';

// Guards
import { SubscriberGuard } from './guards/subscriber.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'homepage', component: HomePageComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'search', component: SearchComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'mylist', component: MylistComponent, canActivate: [SubscriberGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [SubscriberGuard]},
  {path: 'game/:id', component: GameInfoComponent, canActivate: [SubscriberGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
