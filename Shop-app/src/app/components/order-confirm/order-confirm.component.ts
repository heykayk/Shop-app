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
export class OrderConfirmComponent {
  cartItems: { product: Product, quantity: number }[] = [];
  constructor(private cartService: CartService, private productService: ProductService) {

  }

  // ngOnInit(): void {
  //   const cart = this.cartService.getCart();
  //   const productIds = Array.from(cart.keys());
  //   this.productService.findProductByIds(productIds.join(",") ?? "0").subscribe({
  //     next: (products) => {
  //       debugger;
  //       this.cartItems = productIds.map((productId) => {
  //         const product = products.find((p) => p.id === productId);
  //         if (product) {
  //           product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
  //         }
  //         return {
  //           product: product!,
  //           quantity: cart.get(productId)!
  //         }
  //       })
  //       console.log(this.cartItems);
  //     }, complete: () => {

  //     }, error: (error: any) => {
  //       console.error(error);
  //     }
  //   });
  //   // this.productService.findProductByIds(productIds.toString).subscribe({
  //   //   next: (products) => {

  //   //   }
  //   // });
  // }
}
