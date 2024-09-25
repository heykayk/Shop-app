import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../services/order.service';
import { OrderResponse } from '../../../responses/order/order.response';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { OrderDetailResponse } from '../../../responses/order/order.detail.response';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbPopoverModule,
    MatTableModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];
  keyword: string = "";
  orders: OrderResponse[] = [];

  // dữ liệu tạo bảng
  displayedColumns: string[] = ['id', 'phone_number', 'email', 'fullname',
    'address', 'order_date', 'total_money', 'status'];

  // dialog
  dialogRef: MatDialogRef<DialogComponent> | null = null;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOrderByKeyword();
  }

  getOrderByKeyword() {
    this.orderService.getAllOrders(this.keyword, 0, this.itemsPerPage).subscribe({
      next: (response: any) => {
        debugger;
        console.log(this.orders)
        response.orders.forEach((order: OrderResponse) => {
          return order.order_details.forEach((orderDetail: OrderDetailResponse) => {
            if (orderDetail.product.thumbnail.indexOf(environment.apiBaseUrl) < 0) {
              orderDetail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${orderDetail.product.thumbnail}`
            }
          })
        });
        debugger;
        this.orders = response.orders;
        this.totalPages = response.total_page;
      }, complete: () => {

      }, error: (error) => {
        console.error(error);
      }
    });
  }

  buttonSearchClick() {
    alert("hello");
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

  openDialog(order: any): void {
    debugger;
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        data: order
      })

      this.dialogRef.afterClosed().subscribe(() => {
        this.dialogRef = null; // Đặt lại dialogRef sau khi đóng
      });
    }
  }
}
