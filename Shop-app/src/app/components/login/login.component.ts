import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild("loginForm") loginForm!: NgForm;

  phoneNumber: string = '12343';
  password: string = '1234567890';


  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;

  constructor(
    private router: Router, 
    private userservice: UserService,
    private tokenservice: TokenService,
    private roleservice: RoleService,
  ) {}

  ngOnInit(){
    console.log("hello");
    // gọi api để lấy ra danh sách các role
    debugger
    this.roleservice.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.log("Error getting roles: ", error);
      }
    });
  }


  onPhoneNumberChange() {
    console.log(`phone typed: ${this.phoneNumber}`)
  }

  login() {
    const tmp = `phone_number:   ${this.phoneNumber}  password: ${this.password} remeberme: ${this.rememberMe} role: ${this.selectedRole}`;

    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password,
      "role_id": this.selectedRole?.id ?? 1,
    };
    debugger

    this.userservice.login(loginDTO).subscribe(
      {
        next: (response: LoginResponse) => {
          debugger
          const {token} = response;
          this.tokenservice.setToken(token);
          // this.router.navigate(["/login"]);
        },
        complete: () => {
          debugger
          console.log('Đăng nhập thành công!!!');
        },
        error: (error: any) => {
          debugger
          alert(`Cannot register: error: ${error.error}`);
          console.log(error);
        }
      }
    );
  }
}
