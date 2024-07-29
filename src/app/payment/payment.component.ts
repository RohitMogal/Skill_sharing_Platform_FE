import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private snackBar: MatSnackBar) {}

  makePayment(form: NgForm) {
    if (form.valid) {
      // Perform your payment processing logic here

      // Show success message
      this.snackBar.open('Payment successfully done', 'Close', {
        duration: 3000
      });

      // Reset the form
      form.resetForm();
    } else {
      // Show error message
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 3000
      });
    }
  }
}
