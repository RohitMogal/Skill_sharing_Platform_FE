import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private snackBar: MatSnackBar, private dataService: DataServiceService) {}

  

  makePayment(form: NgForm) {
    if (form.valid) {
      this.dataService.makePayment(form.value).subscribe({
        next: (response) => {
          this.snackBar.open('Payment successfully done', 'Close', {
            duration: 3000
          });
          form.resetForm();
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
