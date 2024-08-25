import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { error } from 'console';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderResponse } from '../../responses/order/order.response';
import { OrderService } from '../../services/order.service';
import { response } from 'express';
import { OrderDetailResponse } from '../../responses/order/order.detail.response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit {
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  }

  orderId: number = 0;
  constructor(
    private orderService: OrderService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getOrderDetail();
    this.orderId = Number(this.router.snapshot.paramMap.get('id'));;
  }

  getOrderDetail() {
    debugger;
    if(this.orderId === 0){
      return;
    }

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2],
        );
        debugger;
        this.orderResponse.order_details = response.order_details
          .map((orderDetail: OrderDetailResponse) => {
            if (orderDetail.product.thumbnail.indexOf(environment.apiBaseUrl) < 0) {
              orderDetail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${orderDetail.product.thumbnail}`
            }
            return orderDetail;
          });
        this.orderResponse.shipping_address = response.shipping_address;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2],
        );
        this.orderResponse.payment_method = response.payment_method;
      }, complete: () => {

      }, error: (error: any) => {
        console.error(error);
      }
    });
  }
}
