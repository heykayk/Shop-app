import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = "access_token";
    private jwtHelperService = new JwtHelperService();
    constructor() {

    }

    getToken(): string | null {
        if (typeof window === 'undefined' || !localStorage) {
            return null;
        }
        const accessToken = localStorage.getItem(this.TOKEN_KEY);
        return accessToken === null ? null : `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`;
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getUserId(): number {
        debugger;
        let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? "");
        if(!userObject) return 0;
        return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isTokenExpired(): boolean {
        debugger;
        if (this.getToken() == null) {
            return false;
        }
        return this.jwtHelperService.isTokenExpired(this.getToken()!);
    }
}
