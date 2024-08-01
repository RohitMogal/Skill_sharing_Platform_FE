import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
// import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatesessionComponent } from './pages/createsession/createsession.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MyActivityComponent } from './pages/my-activity/my-activity.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { RequestSessionComponent } from './pages/request-session/request-session.component';
import { ProfileComponent } from './includes/profile/profile.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore-page', component: ExplorePageComponent, canActivate: [AuthGuard] },
  { path: 'card-details', component: CardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-session', component: CreatesessionComponent, canActivate: [AuthGuard] },
  { path: 'request-session', component: RequestSessionComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'my-activity', component: MyActivityComponent },
  { path: 'payment/:amount/:SessionId', component: PaymentComponent },
  { path: 'feedback-form/:SessionId', component: FeedbackFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
