import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Product } from '../../models/product';
import { ProductImage } from '../../models/product.image';
import { ProductService } from '../../services/product.service';
import { response } from 'express';
import { environment } from '../../environments/environment';
import { Console } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    // const idParam = 2;
    // if (idParam !== null) {
    //   this.productId = +idParam;
    // }
    debugger;
    if (!isNaN(this.productId)) {
      this.productService.getProductById(this.productId).subscribe({
        next: (response: any) => {
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              if (!product_image.image_url.startsWith(environment.apiBaseUrl)) {
                let url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
                product_image.image_url = url;
              }
            });
          }
          this.product = response;
          this.showImage(0);
        },
        complete: () => {
          // debugger;
        },
        error: (error: any) => {
          console.error("error: " + error);
        }
      });
    } else {
      console.error("error param: " + this.productId);
    }
  }

  addToCart(): void {
    debugger;
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
      alert(`Sản phẩm vói id = ${this.productId} đã được thêm vào giỏ hàng`)
    } else {
      alert("Không thể thêm sảm phẩm!");
    }
  }

  buyNow(): void {

  }


  showImage(index: number) {
    // debugger;
    if (this.product && this.product.product_images && this.product.product_images.length > 0) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }

      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    this.currentImageIndex = index;
  }

  previousButtonClick() {
    if (this.product && this.product.product_images && this.product.product_images.length > 0) {
      this.currentImageIndex -= 1;
      if (this.currentImageIndex < 0) {
        this.currentImageIndex = this.product.product_images.length - 1;
      }
    }
  }

  nextButtonClick() {
    if (this.product && this.product.product_images && this.product.product_images.length > 0) {
      this.currentImageIndex += 1;
      if (this.currentImageIndex >= this.product.product_images.length) {
        this.currentImageIndex = 0;
      }
    }
  }

  increaseClick() {
    this.quantity++;
  }

  decreaseClick() {
    this.quantity == 1 ? 1 : this.quantity--;
  }
}
