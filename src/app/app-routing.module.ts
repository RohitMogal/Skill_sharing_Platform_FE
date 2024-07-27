import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore-page', component: ExplorePageComponent, canActivate: [AuthGuard] },
  { path: 'card-details', component: CardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-session', component: CreatesessionComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'course-detail', component:CourseDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
