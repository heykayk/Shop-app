import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from "@angular/common/http";
import { Observable, Observer } from "rxjs";
import { TokenService } from "../services/token.service";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RoleService{
    private apiGetRoles = `${environment.apiBaseUrl}/roles`;

    constructor(private http: HttpClient){}

    getRoles(): Observable<any>{
        return this.http.get<any[]>(this.apiGetRoles);
    }
}
