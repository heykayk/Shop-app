import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgSwitch,
    OrdersComponent,
    ProductsComponent,
    CategoriesComponent,
    DashboardComponent,
    NgSwitchCase,
    FormsModule,
    CommonModule,
    NgbPopoverModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  adminComponent: string = "products";
  userResponse?: UserResponse;
  isPopoverOpen: boolean = false;

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {

  }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }



  showAdminComponet(component: string) {
    this.adminComponent = component;
  }

  togglePopover(e: Event): void {
    e.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    if(index ===2){
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();

      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false;
  }
}
