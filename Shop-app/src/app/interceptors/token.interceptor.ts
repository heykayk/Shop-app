import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenservice: TokenService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        const token = this.tokenservice.getToken();
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return next.handle(req);
    }
}