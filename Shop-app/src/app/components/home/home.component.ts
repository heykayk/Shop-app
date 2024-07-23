import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../../services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent, 
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts(this.currentPage, this.itemsPerPage);
  }

  getProducts(page: number, limit: number) {
    this.productService.getProduct(page, limit).subscribe({
      next: (response: any) => {
        // debugger;
        response.products.forEach((product: Product) => {
          product.url =  `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        console.log(this.products);
      },
      complete: () => {
        // debugger;
      },
      error: (error:any) => {
        // debugger;
        console.error(error);
      }
    });
  }
}
