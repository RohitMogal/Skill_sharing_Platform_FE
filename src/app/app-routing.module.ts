import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyActivityComponent } from './my-activity/my-activity.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },
  { path: 'create-session', component: CreatesessionComponent },

 
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore-page', component: ExplorePageComponent },
  { path: 'card-details', component: CardDetailsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  {path:'my-activity' , component:MyActivityComponent},
  {path:'payment', component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
