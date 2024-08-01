import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from '../../services/data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _userService: DataServiceService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this.paymentForm = this._fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      amount: [0, Validators.required],
      SessionId: [''],
    });
  }

  ngOnInit(): void {
    const sessionId = this._route.snapshot.paramMap.get('SessionId')!;
    const amount = this._route.snapshot.paramMap.get('amount')!;
    this.paymentForm.get('amount')?.setValue(amount);
    this.paymentForm.get('SessionId')?.setValue(sessionId);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.emailMethod();
    }
  }
  emailMethod() {
    this._userService.emailApi(this.paymentForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success) {
          this.snackBar.open('Payment Successful!', 'Close', {
            duration: 3000,
          });
          this._toastr.success("Request sent successfully");
          this._router.navigate(['/explore-page']);
        }
      },
      (error: any) => {
        console.error('Error adding data:', error);
        this._toastr.error("Failed to send request");
      }
    );
  }
}
