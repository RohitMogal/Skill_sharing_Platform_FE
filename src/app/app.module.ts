import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { FooterComponent } from './includes/footer/footer.component';
import { CreatesessionComponent } from './pages/createsession/createsession.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InterceptInterceptor } from './interceptors/intercept.interceptor';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { ProfileComponent } from './includes/profile/profile.component';
import { DataServiceService } from './services/data-service.service';
import { FormsModule } from '@angular/forms';
import { RequestSessionComponent } from './pages/request-session/request-session.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MyActivityComponent } from './pages/my-activity/my-activity.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    CreatesessionComponent,
    ExplorePageComponent,
    CardDetailsComponent,
    ProfileComponent,
    RequestSessionComponent,
    PaymentComponent,
    MyActivityComponent,
    PaymentComponent,
    FeedbackFormComponent,
    ForgotPasswordComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatMenuModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    DataServiceService,
    
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
