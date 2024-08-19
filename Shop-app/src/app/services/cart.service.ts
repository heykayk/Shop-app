import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductService } from './product.service';


@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cart: Map<number, number> = new Map();

    constructor(private productService: ProductService) {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                this.cart = new Map(JSON.parse(storedCart));
            }
        }
    }

    addToCart(productId: number, quantity: number) {
        if (this.cart.has(productId)) {
            debugger;
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
            this.cart.set(productId, quantity);
        }
        this.saveToCartStorage();
    }

    getCart(): Map<number, number> {
        return this.cart;
    }

    // hàm lưu sản phẩm vào giỏ hàng
    private saveToCartStorage(): void {
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    // hàm xóa dữ liệu đã lưu vào giỏ hàng
    clearCart(): void {
        this.cart.clear(); // clear giỏ hàng
        this.saveToCartStorage(); // cập nhật giỏ hàng (trống)
    }
}