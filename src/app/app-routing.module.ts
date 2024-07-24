import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home.component';
import { CreatesessionComponent } from './createsession/createsession.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
  { path: 'create-session', component: CreatesessionComponent },
  { path: 'search-session', component:  NavbarComponent},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
