import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductService } from './product.service';
import { TokenService } from './token.service';
import { OrderDTO } from '../dtos/order/order.dto';


@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private urlOrder = `${environment.apiBaseUrl}/orders`;

    // private apiConfig = {
    //     headers: this.createHeaders()
    // }
    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Language': 'vi',
            'Authorization': this.tokenService.getToken() ?? "",
        });
    }

    placeOrder(orderData: OrderDTO): Observable<any>{
        const apiConfig = {
            headers: this.createHeaders()
        }
        return this.http.post(this.urlOrder, orderData, apiConfig);
    }

    getOrderById(orderId: number){
        return this.http.get( `${environment.apiBaseUrl}/orders/${orderId}`);
    }
}