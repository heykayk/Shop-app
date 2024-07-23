import { Component, ViewChild, importProvidersFrom } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers:[
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor( private router: Router, private userservice: UserService) {
    this.phoneNumber = "";
    this.password = "";
    this.retypePassword = "";
    this.fullName = "";
    this.address = "";
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneNumberChange() {
    console.log(`phone typed: ${this.phoneNumber}`)
  }

  register() {
    const registerDTO:RegisterDTO = {
      "fullname": this.fullName,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    };
    this.userservice.register(registerDTO).subscribe(
      {
        next: (response: any) => {
          debugger
          const token = response.token;
          this.router.navigate(["/login"]);
        },
        complete: () => {
          debugger
          console.log('dang ki thanh cong');
        },
        error: (error: any) => {
          alert(`Cannot register: error: ${error.error}`);
          console.log(error);
        }
      }
    );
  }

  checkPasswordMatch() {
    if (this.registerForm && this.registerForm.form && this.registerForm.form.controls['retypePassword']) {
      if (this.password !== this.retypePassword) {
        this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true });
      } else {
        this.registerForm.form.controls['retypePassword'].setErrors(null);
      }
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthday = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
