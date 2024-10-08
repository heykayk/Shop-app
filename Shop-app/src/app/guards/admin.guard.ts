import { inject, Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserResponse } from "../responses/user/user.response";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard {
    userResponse?:UserResponse;

    constructor(
        private tokenService: TokenService,
        private router: Router,
        private userService: UserService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId() > 0;
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        const isAdmin = this.userResponse?.role.name === "admin";

        if (!isTokenExpired && isUserIdValid && isAdmin) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}

export const AdminGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger;
    return inject(AdminGuard).canActivate(next, state);
};