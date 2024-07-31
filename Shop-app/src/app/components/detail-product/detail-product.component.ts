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

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    console.log("heloiawhefoihewf");
    const idParam = 2;
    if (idParam !== null) {
      this.productId = +idParam;
    }

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
      console.error("error param: " + idParam);
    }
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

  previousButtonClick(){
    if(this.product && this.product.product_images && this.product.product_images.length > 0){
      this.currentImageIndex -= 1;
      if(this.currentImageIndex < 0){
        this.currentImageIndex = this.product.product_images.length - 1;
      }
    }
  }

  nextButtonClick(){
    if(this.product && this.product.product_images && this.product.product_images.length > 0){
      this.currentImageIndex += 1;
      if(this.currentImageIndex >= this.product.product_images.length){
        this.currentImageIndex = 0;
      }
    }
  }

  increaseClick(){
    this.quantity++;
  }

  decreaseClick(){
    this.quantity == 1? 1:this.quantity--;
  }
}
