import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CreatesessionComponent } from './createsession/createsession.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyActivityComponent } from './my-activity/my-activity.component';
import { PaymentComponent } from './payment/payment.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';



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
    ForgotPasswordComponent,
    MyActivityComponent,
    PaymentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    FormsModule ,
    NgMultiSelectDropDownModule.forRoot()
  
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
