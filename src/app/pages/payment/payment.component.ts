import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, NgForm } from '@angular/forms';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private snackBar: MatSnackBar, private dataService: DataServiceService) {}
  paymentForm: FormGroup |any;
  makePayment() {
    if (this.paymentForm.valid) {
      this.dataService.makePayment(this.paymentForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Payment successfully done', 'Close', {
            duration: 3000
          });
          this.paymentForm.resetForm();
        },
        error: (error) => {
          this.snackBar.open('Payment failed', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 3000
      });
    }
  }
}
