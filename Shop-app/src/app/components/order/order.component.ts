import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderDTO } from '../../dtos/order/order.dto';
import { Validator } from 'class-validator';
import { OrderService } from '../../services/order.service';
import { error } from 'console';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orderForm: FormGroup;
  // couponCode: string = '';
  cartItems: { product: Product, quantity: number }[] = [];
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 1,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    couponCode: '',
    shipping_method: 'express',
    cart_items: []
  }



  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      fullname: ['Ngô Minh Hiếu', [Validators.required]],
      email: ['ngohieu123kayk@gmail.com', Validators.email],
      phone_number: ['11223333', [Validators.required, Validators.minLength(6)]],
      address: ['Nhà a ngõ b', [Validators.required, Validators.minLength(5)]],
      note: [''],
      shipping_method: ['express'],
      payment_method: ['cod'],
      couponCode: [''],
    });
  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    this.productService.findProductByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          }
        })
        console.log(this.cartItems);
      }, complete: () => {
        this.caculateTotalAmount();
      }, error: (error: any) => {
        console.error(error);
      }
    });
    // this.prod
  }

  // hàm tính toán tổng tiền
  caculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => {
        return total + item.product.price * item.quantity;
      }, 0
    );
  }

  // hàm bắt sự kiện mua hàng
  placeOrder() {
    debugger;
    // sử dụng toán tử spread(...) để tạo sao chép giá trị
    if (this.orderForm.valid) {
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      }
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      console.log(this.orderData);

      this.orderService.placeOrder(this.orderData).subscribe({
        next: (message: any) => {
          debugger;
          console.log(message);
        },
        complete: () => {

        },
        error: (error: any) => {
          debugger;
          console.error(error);
        }
      });
    }
  }
}
