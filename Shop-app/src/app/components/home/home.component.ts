import { Component, CSP_NONCE, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../../services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';
import { start } from 'repl';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    FormsModule,
    CommonModule,
    NgbPopoverModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  categoryId: number = 0;
  keyword: string = "";
  products: Product[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts(this.keyword, this.categoryId, this.currentPage, this.itemsPerPage);
  }

  getCategories() {
    this.categoryService.getCategories(0, 100).subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      complete: () => {

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getProducts(keyword: string, categoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, categoryId, page, limit).subscribe({
      next: (response: any) => {
        // debugger;
        response.products.forEach((product: Product) => {
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        debugger;
        this.products = response.products;
        this.totalPages = response.total_pages;
        this.visiblePage = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        // debugger;
      },
      error: (error: any) => {
        // debugger;
        console.error(error);
      }
    });
  }

  searchProducts() {
    this.totalPages = 1;
    // console.log(`${this.keyword} ${this.categoryId}`);
    this.getProducts(this.keyword, this.categoryId, this.currentPage, this.itemsPerPage);
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page - 1;
    this.getProducts(this.keyword, this.categoryId, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    console.log(halfVisiblePages);
    debugger;

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  onProductClick(productId: number) {
    this.route.navigate(["/products", productId]);
  }
}
