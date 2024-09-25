import { Component } from '@angular/core';
import { OrderResponse } from '../../../responses/order/order.response';
import { OrderService } from '../../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailResponse } from '../../../responses/order/order.detail.response';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../../models/category';
import { ProductService } from '../../../services/product.service';
import { response } from 'express';
import { error } from 'console';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbPopoverModule,
    MatTableModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  categories: Category[] = [];
  categoriesId: number = 0;
  products: Product[] = [];

  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];
  keyword: string = "";
  orders: OrderResponse[] = [];

  // dữ liệu tạo bảng
  displayedColumns: string[] = ['id', 'thumbnail', 'name', 'price'];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getProducts(this.keyword, this.categoriesId, this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        debugger;
        response.products.forEach((product: Product) => {
          if (product.thumbnail.indexOf(environment.apiBaseUrl) < 0) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
        })
        this.products = response.products;
        console.log(this.products);
      }, complete: () => {

      }, error: (error: any) => {
        console.error(error);
      }
    })
  }
}
