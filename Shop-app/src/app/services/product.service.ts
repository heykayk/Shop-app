import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiGetProductsUrl = `${environment.apiBaseUrl}/products`;
    constructor(private http: HttpClient) { }

    getProducts(keyword: string, categoryId: number, page: number, limit: number): Observable<Product[]> {
        const params = new HttpParams()
            .set('category_id', categoryId.toString())
            .set('keyword', keyword.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetProductsUrl, { params });
    }

    getProductById(productId: number){
        return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
    }
}