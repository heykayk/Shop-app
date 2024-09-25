import { inject, Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGaurd {
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId() > 0;
        const userResponse = this.userService?.getUserResponseFromLocalStorage() ?? null;

        if (userResponse && userResponse.role.name === "admin") {
            this.router.navigate(["/admin"]);
            return false;
        }

        if (!isTokenExpired && isUserIdValid) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}

export const AuthGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger;
    return inject(AuthGaurd).canActivate(next, state);
};