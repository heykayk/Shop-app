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
import { error } from 'console';
import { UserResponse } from '../../responses/user/user.response';

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
  userResponse?: UserResponse;


  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: number | undefined;

  constructor(
    private router: Router,
    private userservice: UserService,
    private tokenservice: TokenService,
    private roleservice: RoleService,
  ) { }

  ngOnInit() {
    this.roleservice.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0].id : undefined;
      },
      error: (error: any) => {
        console.log("Error getting roles: ", error);
      }
    });
  }


  onPhoneNumberChange() {
    console.log(`phone typed: ${this.phoneNumber}`)
  }

  login() {
    const tmp = `phone_number:   ${this.phoneNumber}  password: ${this.password} remeberme: ${this.rememberMe} role: ${this.selectedRole}`;

    debugger;
    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password,
      "role_id": this.selectedRole ?? 1,
    };

    this.userservice.login(loginDTO).subscribe(
      {
        next: (response: LoginResponse) => {
          debugger
          const { token } = response;
          this.tokenservice.setToken(token);

          this.userservice.getUserDetail(token).subscribe({
            next: (response: any) => {
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth)
              }
              this.userservice.saveUserResponseToLocalStorage(this.userResponse);

              if (this.userResponse?.role.name === "admin") {
                this.router.navigate(["/admin"]);
              } else if (this.userResponse?.role.name === "user") {
                this.router.navigate(["/"]);
              }
            }, complete: () => {
              debugger;
            }, error: (error: any) => {
              console.error(error);
            }
          });

        },
        complete: () => {
          console.log('Đăng nhập thành công!!!');
        },
        error: (error: any) => {
          alert(`Cannot register: error: ${error.error}`);
          console.log(error);
        }
      }
    );
  }
}
