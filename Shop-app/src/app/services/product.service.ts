import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ProductDTO } from '../dtos/product/product.dto';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiGetProductUrl = `${environment.apiBaseUrl}/products`;

    private apiConfig = {
        headers: this.createHeaders()
    }

    constructor(private http: HttpClient) { }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Language': 'vi'
        });
    }

    getProduct(page: number, limit: number) {
        let url = this.apiGetProductUrl + `?page=${page}&limit=${limit}`;
        return this.http.get(url, this.apiConfig);
    }
}