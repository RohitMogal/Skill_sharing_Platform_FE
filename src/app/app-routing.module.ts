import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
  { path: 'create-session', component: CreatesessionComponent, canActivate:[AuthService] },

 
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore-page', component: ExplorePageComponent },
  { path: 'card-details', component: CardDetailsComponent },



  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'create-session', component: NavbarComponent },
  // { path: 'search-session', component:  NavbarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
